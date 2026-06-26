const express = require("express");

const router = express.Router();

const portfolioController = require("../controllers/portfolioController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", portfolioController.getPortfolio);

router.post("/", protect, portfolioController.createPortfolio);

router.put("/:id", protect, portfolioController.updatePortfolio);

router.delete("/:id", protect, portfolioController.deletePortfolio);

module.exports = router;
