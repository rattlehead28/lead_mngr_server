const express = require("express");
const router = express.Router();
const {
  getLeadById,
  addLead,
  updateLead,
  markLead,
  deleteLead,
} = require("./../controllers/leads");

const handleError = (req, res) =>
  res.status(400).json({ status: "failure", reason: "Lead ID is missing" });

router.get("/leads/:id?", getLeadById);

router.post("/leads/", addLead);

router.put("/leads/:id", updateLead);

router.put("/mark_lead/:id", markLead);

router.delete("/leads/:id", deleteLead);

// Handle routes without ':id'
//router.get("/leads/", handleError);
router.put("/leads/", handleError);
router.put("/mark_lead/", handleError);
router.delete("/leads/", handleError);



module.exports = router;
