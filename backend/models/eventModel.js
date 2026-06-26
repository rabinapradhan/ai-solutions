const pool = require("../config/db");

const getEvents = async () => {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY event_date ASC",
  );

  return result.rows;
};

const createEvent = async (data) => {
  const { title, description, location, event_date } = data;

  const result = await pool.query(
    `
    INSERT INTO events
    (title, description, location, event_date)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [title, description, location, event_date],
  );

  return result.rows[0];
};

const updateEvent = async (id, data) => {
  const { title, description, location, event_date } = data;

  const result = await pool.query(
    `
    UPDATE events
    SET
      title=$1,
      description=$2,
      location=$3,
      event_date=$4
    WHERE id=$5
    RETURNING *
    `,
    [title, description, location, event_date, id],
  );

  return result.rows[0];
};

const deleteEvent = async (id) => {
  await pool.query("DELETE FROM events WHERE id=$1", [id]);
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
