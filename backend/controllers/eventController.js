const Event = require("../models/eventModel");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.getEvents();

    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch events",
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.createEvent(req.body);

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create event",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.updateEvent(req.params.id, req.body);

    res.json(event);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update event",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.deleteEvent(req.params.id);

    res.json({
      message: "Event deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete event",
    });
  }
};
