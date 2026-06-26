const Portfolio = require("../models/portfolioModel");

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.getPortfolio();

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch portfolio",
    });
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const project = await Portfolio.createPortfolio(req.body);

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create portfolio item",
    });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.updatePortfolio(req.params.id, req.body);

    res.json(project);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update portfolio item",
    });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.deletePortfolio(req.params.id);

    res.json({
      message: "Portfolio item deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete portfolio item",
    });
  }
};
