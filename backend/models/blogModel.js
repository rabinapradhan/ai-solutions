const pool = require("../config/db");

const getBlogs = async () => {
  const result = await pool.query(
    "SELECT * FROM blogs ORDER BY created_at DESC",
  );
  return result.rows;
};

const createBlog = async (data) => {
  const { title, content, author, category } = data;

  const result = await pool.query(
    `
    INSERT INTO blogs
    (title, content, author, category)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [title, content, author, category],
  );

  return result.rows[0];
};

const updateBlog = async (id, data) => {
  const { title, content, author, category } = data;

  const result = await pool.query(
    `
    UPDATE blogs
    SET
      title=$1,
      content=$2,
      author=$3,
      category=$4
    WHERE id=$5
    RETURNING *
    `,
    [title, content, author, category, id],
  );

  return result.rows[0];
};

const deleteBlog = async (id) => {
  await pool.query("DELETE FROM blogs WHERE id=$1", [id]);
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
