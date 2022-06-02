import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const activitySchema = new Schema({
  type: { type: String, required: [true, "Type is required"] },
  creator: {
    type: ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },
  performer: {
    type: String,
    required: [true, "Performer is required"],
  },
  date: { type: Date, default: Date.now },
});

export default model("Activity", activitySchema);
