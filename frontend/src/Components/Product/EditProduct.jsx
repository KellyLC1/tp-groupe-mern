import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currentImages, setCurrentImages] = useState([]); 
  const [newImages, setNewImages] = useState([]); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  const token = localStorage.getItem("token");


  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const product = response.data; 

        if (product) {
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setLocation(product.location);
          setCurrentImages(product.images || []); 
        } else {
          alert("Product non trouvé.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du product", error);
        alert("Impossible de charger les données du product.");
      });
  }, [id, token]);

  
  const handleFileChange = (e) => {
    setNewImages(e.target.files); 
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 


    const updatedProduct = {
      title,
      description,
      price,
      category,
      location,
      // images: newImages, 
      // currentImages, 
    };

    axios
      .put(
        `http://localhost:8080/product/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Product mis à jour avec succès !");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du product", error);
        alert("Erreur lors de la mise à jour du product.");
      });
  };

  return (
    <div className="product-form">
      <h1>Modifier le Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />


        {/* <div className="current-images">
          <h3>Images actuelles :</h3>
          {currentImages.length > 0 ? (
            currentImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8080/uploads/${image}`}
                alt={`Image ${index + 1}`}
                className="preview-image"
              />
            ))
          ) : (
            <p>Aucune image disponible</p>
          )}
        </div> */}

{/* 
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        /> */}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditProduct;
