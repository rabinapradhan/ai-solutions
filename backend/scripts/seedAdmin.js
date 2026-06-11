const bcrypt = require("bcrypt");
const pool = require("../config/db");

const seedAdmin = async () => {
  const password = "securepassword123";
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admins (username, email, password_hash) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (email) DO UPDATE SET password_hash = $3`,
    ["admin", "admin@ai-solutions.com", hash],
  );

  pool.end();
};

seedAdmin();
