const pool = require("../config/db");

const createInquiry = async (data) => {
  const {
    full_name,
    email,
    phone,
    company_name,
    country,
    job_title,
    job_details,
  } = data;
  const result = await pool.query(
    `INSERT INTO inquiries (full_name, email, phone, company_name, country, job_title, job_details)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [full_name, email, phone, company_name, country, job_title, job_details],
  );
  return result.rows[0];
};

const getInquiries = async () => {
  const result = await pool.query(
    "SELECT * FROM inquiries ORDER BY created_at DESC",
  );
  return result.rows;
};

const updateInquiryStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE inquiries SET status=$1 WHERE id=$2 RETURNING *",
    [status, id],
  );
  return result.rows[0];
};

const deleteInquiry = async (id) => {
  await pool.query("DELETE FROM inquiries WHERE id=$1", [id]);
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
};
