const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", inquiryController.submitInquiry);
router.get("/", protect, inquiryController.getInquiries);
router.patch("/:id/status", protect, inquiryController.updateStatus);
router.delete("/:id", protect, inquiryController.deleteInquiry);

module.exports = router;
