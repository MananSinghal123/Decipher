const express = require("express");
const router = express.Router();
const {
  getTeams,
  setTeam,
  submitTask,
} = require("../controllers/teamController");

// const { protect } = require("../middleware/authMiddleware");

router.get("/", getTeams);
router.post("/", setTeam);
router.post("/task", submitTask);

module.exports = router;
