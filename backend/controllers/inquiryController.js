const Inquiry = require("../models/inquiryModel");

exports.submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.createInquiry(req.body);
    res.status(201).json({ message: "Inquiry submitted", inquiry });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.getInquiries();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.updateInquiryStatus(
      req.params.id,
      req.body.status,
    );
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    await Inquiry.deleteInquiry(req.params.id);
    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
};
