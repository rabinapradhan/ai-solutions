const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", blogController.getBlogs);

// ADMIN
router.post("/", protect, blogController.createBlog);
router.put("/:id", protect, blogController.updateBlog);
router.delete("/:id", protect, blogController.deleteBlog);

module.exports = router;
