const Blog = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getBlogs();

    res.json(blogs);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch blogs",
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.createBlog(req.body);

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create blog",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.deleteBlog(req.params.id);

    res.json({
      message: "Blog deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete blog",
    });
  }
};
