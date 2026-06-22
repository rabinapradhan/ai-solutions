const pool = require("../config/db");

const findAdminByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM admins WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};

const findAdminById = async (id) => {
  const result = await pool.query("SELECT * FROM admins WHERE id=$1", [id]);

  return result.rows[0];
};

const createAdmin = async (username, email, password_hash) => {
  const result = await pool.query(
    "INSERT INTO admins (username, email, password_hash) VALUES ($1,$2,$3) RETURNING *",
    [username, email, password_hash],
  );
  return result.rows[0];
};

const updatePassword = async (id, password_hash) => {
  const result = await pool.query(
    `UPDATE admins
     SET password_hash = $1
     WHERE id = $2
     RETURNING id, username, email`,
    [password_hash, id],
  );

  return result.rows[0];
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updatePassword,
};
