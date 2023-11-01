import mongoose, { models, mongo } from "mongoose";
import { Schema } from "mongoose";

const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const State = models.State || mongoose.model("State", stateSchema);

export default State;
