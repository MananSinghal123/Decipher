const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

const getTeams = asyncHandler(async (req, res) => {
  try {
    // Fetch all teams and exclude the _id field
    const teams = await Team.find({}, { _id: 0 }).sort({
      currentTask: -1,
      timestamp: 1,
    }); // {_id: 0} tells MongoDB to exclude the _id field

    res.status(200).json(teams); // Return the teams data as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

const setTeam = asyncHandler(async (req, res) => {
  const { teamName } = req.body;

  if (!teamName) {
    res.status(400).json({ error: "Please provide a team name." });
    // throw new Error();
  }

  // Check if a team with the same name already exists
  const existingTeam = await Team.findOne({ team: teamName });
  if (existingTeam) {
    res.status(400).json({ error: "Team name already exists." });
    // throw new Error();
  }

  // Create a new team
  const team = await Team.create({
    team: teamName,
    currentTask: 1, // Initialize currentTask to 1
    lastTask: 0, // Initialize lastTask to 0
  });

  res.status(201).json(team);
});

const submitTask = asyncHandler(async (req, res) => {
  const { taskNumber, team } = req.body;

  let taskProgress = await Team.findOne({ team });

  if (!taskProgress) {
    res.status(404);
    throw new Error("Team not found");
  }

  // Check if the task is being completed in the correct order
  if (taskNumber !== taskProgress.currentTask) {
    res.status(400);
    throw new Error(
      `Please complete task ${taskProgress.currentTask} before proceeding.`
    );
  }

  // Update the task progress
  taskProgress.lastTask = taskProgress.currentTask;
  taskProgress.currentTask += 1;
  taskProgress.timestamp = new Date();

  await taskProgress.save();

  res.status(200).json(taskProgress);
});

module.exports = {
  getTeams,
  setTeam,
  submitTask,
};
