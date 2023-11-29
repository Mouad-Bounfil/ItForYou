import express from "express" 
import Category from "../models/Category.js";
// import categoriesData from "../Ecommerce.category.json"

const router = express.Router();

// API routes for CRUD operations
export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategoryList = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({categories});
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Utilize data from the JSON file

// router.get("/data", (req, res) => {
//   res.json(categoriesData);
// });

export default router
