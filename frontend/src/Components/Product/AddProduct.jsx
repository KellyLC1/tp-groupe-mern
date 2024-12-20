import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const createdAt = new Date().toISOString();


  const handleFileChange = (e) => {
    setImages(e.target.files); // Capture les fichiers sélectionnés
  };

  const handleProduct = () => {

    axios
      .product(
        "http://localhost:8080/product",
        {
          title: title,
          description: description,
          price: price,
          category: category,
          location: location,
          createdAt: createdAt,
          // author: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Recette créée avec succès !");
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la création de la recette");
      });
    
};

  return (
    <div className="product-form">
      <h1>Créer un Product</h1>
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
  
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button onClick={handleProduct}>Créer le Product</button>
    </div>
  );
};

export default AddProduct;