import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        
        alert("Connexion réussie");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la connexion");
      });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
