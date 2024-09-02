const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");
const TaskProgress = require("../models/taskProgress");

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({ team: req.team.id });

  res.status(200).json(teams);
});

const setTeam = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const team = await Team.create({
    team: req.team.id,
  });

  res.status(200).json(team);
});

const submitTask = asyncHandler(async (req, res) => {
  const { taskNumber } = req.body;
  const teamId = req.team.id;

  let taskProgress = await TaskProgress.findOne({ teamId });

  if (!taskProgress) {
    taskProgress = new TaskProgress({ teamId });
  }

  // Check if the task is being completed in the correct order
  if (taskNumber !== taskProgress.currentTask) {
    res.status(400);
    throw new Error(`Please complete task ${taskProgress.currentTask} before proceeding.`);
  }

  // Update the task progress
  taskProgress.lastTask = taskProgress.currentTask;
  taskProgress.currentTask += 1;

  await taskProgress.save();

  res.status(200).json(taskProgress);
});

module.exports = {
  getTeams,
  setTeam,
  submitTask,
};
