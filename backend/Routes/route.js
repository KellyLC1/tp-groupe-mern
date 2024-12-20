const express = require("express");
const {
  Register,
  Login,
  updateUser,
  deleteUsers,
  deleteUser,
  getUsers,
  getUser,
} = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  updateProduct,
  getProductByUserId,
  deleteProduct,
  getProductById,
} = require("../Controllers/productController");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUsers);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUser);
router.get("/product/user/:userId", authMiddleware, getProductByUserId);
router.post("/product", authMiddleware, createProduct);
router.get("/products", authMiddleware, getProducts);
router.put("/product/:id", authMiddleware, updateProduct);
router.get("/product/:id", authMiddleware, getProductById);
router.delete("/product/:id", authMiddleware, deleteProduct);

module.exports = router;
