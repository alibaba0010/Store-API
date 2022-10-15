import pkg from "mongoose";
const { Schema, model } = pkg;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: false },
    company: {
      type: String,
      enum: ["ikea", "liddy", "caressa", "marcos"]
    }, 
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
