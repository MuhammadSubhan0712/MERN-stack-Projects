import Task from "../models/task.model.js";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

exports.getAllTasks = async (req, res, next) => {
  try {
    //Filtering:
    const filter = {};
    if (req.query.team) filter.team = req.query.team;
    if (req.query.status) filter.status = req.query.status;

    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    // Advanced Filtering:
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //Execute query:
    const features = new APIFeatures(
      Task.find(JSON.parse(queryStr)).populate("assignedTo createdBy team"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tasks = await features.query;
    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo createdBy"
    );

    if (!task) {
      return next(new AppError("No task found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return next(new AppError("No task found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return next(new AppError("No task found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
