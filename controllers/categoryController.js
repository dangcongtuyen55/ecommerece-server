const Category = require("../models/catagoryModel");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if user have role = 1 ====> admin
      //only admin can create, delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(200).json({ msg: "this category is already" });
      const newCategory = new Category({ name });
      await newCategory.save();
      res.json({ msg: "Created new category" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Category deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Category update success!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = categoryController;
