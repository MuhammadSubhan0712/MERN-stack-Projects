import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A task must have a title"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["backlog", "todo", "in-progress", "done", "archived"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    dueDate: Date,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
    },
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
