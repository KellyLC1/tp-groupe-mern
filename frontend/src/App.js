import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AddProduct from "./Components/Product/AddProduct";
import EditProduct from "./Components/Product/EditProduct";
import GetProduct from "./Components/Product/GetProduct";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import UpdateUser from "./Components/Users/UpdateUser";
import Navbar from "./Components/Navbar/Navbar"; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<AddProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<UpdateUser />} />
          <Route path="/edit_product/:id" element={<EditProduct />} />
          <Route path="/get_product/:id" element={<GetProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
