import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";

const GetProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currentImages, setCurrentImages] = useState([]); 
  // const [newImages, setNewImages] = useState([]); 
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

  

  return (
    <div className="product-form">
      <h1>Product</h1>
      <div >
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required disabled
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required disabled
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required disabled
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required disabled
        />
        <input
          type="text"
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required disabled
        />

      </div>
    </div>
  );
};

export default GetProduct;
