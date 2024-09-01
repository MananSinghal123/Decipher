const express = require("express");
const router = express.Router();
const { getTeams, setTeam } = require("../controllers/teamController");

// const { protect } = require("../middleware/authMiddleware");

router.get("/", getTeams);
router.post("/", setTeam);

module.exports = router;
