const pool = require("../config/db");
const { generateEmbedding } = require("../utils/embeddingService");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.chatbotHandler = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query required" });

    const queryEmbedding = await generateEmbedding(query);

    const result = await pool.query(
      `SELECT section, content, embedding <-> $1::vector AS distance
       FROM knowledge_base
       ORDER BY distance
       LIMIT 3`,
      [JSON.stringify(queryEmbedding)],
    );

    const context = result.rows.map((r) => r.content).join("\n");
    const bestSection = result.rows[0]?.section || "home";

    const prompt = `
You are an AI assistant for AI-Solutions.
Use only this context:

${context}

Question:
${query}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ answer: response.text, link: `/${bestSection}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
