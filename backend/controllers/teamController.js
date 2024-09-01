const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

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

module.exports = {
  getTeams,
  setTeam,
};
