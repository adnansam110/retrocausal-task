import mongoose, { models, mongo } from "mongoose";
import { Schema } from "mongoose";

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Country = models.Country || mongoose.model("Country", countrySchema);

export default Country;
