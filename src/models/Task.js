import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    patientname: {
      type: String,
      required: [true, "Patient Name is required "],
      unique: true,
      trim: true,
      maxlength: [40, "Patient Name cannot be grater than 40 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required "],
    },
    sex: {
      type: String,
      required: [true, "Sex is required "],
    },
    chol: {
      type: Number,
      required: [true, "Chol is required "],
    },
    bp: {
      type: Number,
      required: [true, "BP is required "],
    },
    sugar: {
      type: Number,
      required: [true, "Sugar is required "],
    },
    restecg: {
      type: Number,
      required: [true, "Restecg is required "],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);
