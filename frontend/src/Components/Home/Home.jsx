import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes", error);
      });
  }, []);

  const handleAdd = () => {
    navigate("/product"); 
  };

  const handleEdit = (id) => {
    navigate(`/edit_product/${id}`); 
  };
  const handleGet = (id) => {
    navigate(`/get_product/${id}`); 
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      axios
        .delete(`http://localhost:8080/product/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Recette supprimée avec succès !");
          // Met à jour l'état pour supprimer la recette de l'affichage
          setProducts(products.filter((product) => product._id !== id)); // Assurez-vous que la clé est '_id' pour MongoDB
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la recette", error);
        });
    }
  };

  return (
    <div>
      <h1>Liste des recettes</h1>
      <button className="add" onClick={handleAdd}>Ajouter une recette</button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p><strong>Titre :</strong> {product.title}</p>
            <p><strong>Description :</strong> {product.description}</p>
            <p><strong>Catégorie :</strong> {product.category}</p>
            <p><strong>Prix :</strong> {product.price}</p>
            <p><strong>Vendu :</strong> {product.isSold ? 'Oui' : 'Non'}</p>
            <p><strong>Date :</strong> {product.createdAt}</p>

            {/* Affichage des images si elles existent */}
            {product.images && product.images.length > 0 && (
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8080/uploads/${image}`} 
                    alt={`Image ${index + 1}`}
                    className="product-image"
                  />
                ))}
              </div>
            )}
            <button className="update" onClick={() => handleGet(product._id)}>Afficher</button>

            <button className="update" onClick={() => handleEdit(product._id)}>Modifier</button>
            <button className="delete" onClick={() => handleDelete(product._id)}>Effacer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
