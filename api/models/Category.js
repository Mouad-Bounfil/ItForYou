import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sub: {
    type: [],
  },
});

// Use mongoose.model to create the User model
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
