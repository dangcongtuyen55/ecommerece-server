const Products = require("../models/productModel");

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find({ isDelete: false });

      res.json({ result: products.length, products });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
        isDelete,
      } = req.body;
      if (!images) return res.status(404).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(404).json({ msg: "this product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
        isDelete,
      });
      await newProduct.save();
      res.json({ newProduct });
      console.log(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        { isDelete: true }
      );
      res.json({ msg: "Product deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
        isDelete,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
          isDelete,
        }
      );
      res.json({ msg: "Update a product success!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productCtrl;
