const Task = require("../../app/model/task.model");
const User = require("../../app/model/user.model");

class TaskController {
  async createTask(req, res) {
    try {
      const { title, description, assignedTo } = req.body;

      // Check if the assigned user exists
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(404).json({ message: "Assigned user not found" });
      }

      const newTask = new Task({
        title,
        description,
        assignedTo,
      });

      const data = await newTask.save();

      res.status(201).json({
        status: "success",
        message: "Task created successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Server error in createTask",
      });
    }
  }
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find().populate("assignedTo", "name email role");
      res.status(200).json({
        status: "success",
        message: "Tasks fetched successfully",
        data: tasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Server error in getAllTasks",
      });
    }
  }
  
  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const { title, description, status, assignedTo } = req.body;

      const task = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, assignedTo },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Server error in updateTask",
      });
    }
  }

    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;

            const task = await Task.findByIdAndDelete(taskId);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json({
                status: "success",
                message: "Task deleted successfully",
                data: task,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in deleteTask" });
        }
    }

    
}

module.exports = new TaskController();