const pool = require("../config/db");

const { generateEmbedding } = require("../utils/embeddingService");

const data = [
  {
    section: "about",
    content:
      "AI-Solutions is a start-up technology company based in Sunderland. The company leverages artificial intelligence technologies to assist various industries with innovative software solutions. AI-Solutions focuses on rapidly and proactively addressing issues that can impact the digital employee experience, helping organizations improve productivity, efficiency, and workplace support",
  },
  {
    section: "mission",
    content:
      "The mission of AI-Solutions is to innovate, promote, and deliver the future of the digital employee experience. The company is committed to supporting people at work through AI-powered technologies and digital solutions. This commitment drives the company's growth strategy and long-term vision for global expansion.",
  },
  {
    section: "services",
    content:
      "AI-Solutions provides AI-powered software solutions designed to improve workplace productivity, support digital transformation, and enhance employee experiences. The company develops intelligent systems that help organizations identify, manage, and resolve workplace challenges more efficiently.",
  },
  {
    section: "virtual_assistant",
    content:
      "AI-Solutions offers an AI-powered virtual assistant that can respond to user inquiries and provide relevant information about the company's services. The virtual assistant helps improve customer engagement by delivering quick responses and guiding users to appropriate information and services.",
  },
  {
    section: "inquiries",
    content:
      "Visitors can submit inquiries through the Inquiries form in our website. Inquiry submissions are reviewed by administrators who can manage, track, and respond to customer requests through the administration system.",
  },
  {
    section: "faq",
    content: `
Frequently Asked Questions:

Q: What does AI-Solutions do?
A: AI-Solutions provides AI-powered software solutions, virtual assistant services, and affordable prototyping solutions.

Q: What industries can benefit from AI-Solutions?
A: Various industries can benefit from AI-Solutions' AI-powered technologies and digital workplace solutions.

Q: What is the company's mission?
A: The mission is to innovate, promote, and deliver the future of the digital employee experience.

Q: Does AI-Solutions provide virtual assistant services?
A: Yes, AI-Solutions offers an AI-powered virtual assistant that responds to user inquiries and provides information about services.
`,
  },
];

async function seed() {
  try {
    await pool.query("TRUNCATE TABLE knowledge_base");

    for (const item of data) {
      const embedding = await generateEmbedding(item.content);

      console.log("Section:", item.section);
      console.log("Embedding length:", embedding.length);

      await pool.query(
        `
        INSERT INTO knowledge_base
        (
          section,
          content,
          embedding
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        `,
        [item.section, item.content, JSON.stringify(embedding)],
      );
    }

    console.log("Knowledge Base Seeded");

    process.exit();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

seed();
