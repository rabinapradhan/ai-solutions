const pool = require("../config/db");

const getPortfolio = async () => {
  const result = await pool.query(
    "SELECT * FROM portfolio ORDER BY created_at DESC",
  );

  return result.rows;
};

const createPortfolio = async (data) => {
  const { title, category, description, image_url, metric } = data;

  const result = await pool.query(
    `
    INSERT INTO portfolio
    (title, category, description, image_url, metric)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [title, category, description, image_url, metric],
  );

  return result.rows[0];
};

const updatePortfolio = async (id, data) => {
  const { title, category, description, image_url, metric } = data;

  const result = await pool.query(
    `
    UPDATE portfolio
    SET
      title=$1,
      category=$2,
      description=$3,
      image_url=$4,
      metric=$5
    WHERE id=$6
    RETURNING *
    `,
    [title, category, description, image_url, metric, id],
  );

  return result.rows[0];
};

const deletePortfolio = async (id) => {
  await pool.query("DELETE FROM portfolio WHERE id=$1", [id]);
};

module.exports = {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
