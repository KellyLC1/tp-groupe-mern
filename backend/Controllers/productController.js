const Product = require("../Models/productModel");

const createProduct = async (req, res) => {
  const authorId = req.user.id; 
  
  try {
    const product = new Product({
      ...req.body,
      author: authorId,
    });

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }

    if (req.query.priceMin || req.query.priceMax) {
      filter.price = {};
      if (req.query.priceMin) filter.price.$gte = parseFloat(req.query.priceMin);
      if (req.query.priceMax) filter.price.$lte = parseFloat(req.query.priceMax);
    }

    const products = await Product.find(filter).populate("author", "username email");

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id).populate("author", "username email");
    console.log(product);
    
    
    if (!product) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductByUserId = async (req, res) => {
  try {
    const products = await Product.find({ author: req.params.userId }).populate(
      "author",
      "username email"
    );
    if (products.length === 0) {
      return res.status(404).send({ error: "Aucune annonce trouvée pour cet utilisateur" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  getProductByUserId,
  deleteProduct,
  getProductById,
};
