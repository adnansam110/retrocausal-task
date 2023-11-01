import mongoose, { models, mongo } from "mongoose";
import { Schema } from "mongoose";

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const City = models.City || mongoose.model("City", citySchema);

export default City;
