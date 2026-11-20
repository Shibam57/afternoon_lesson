const { getCollection } = require("../db/mongoDB.js");

// GET search
const searchLessons = async (req, res) => {
  try {
    const { q } = req.query;
    if (typeof q !== "string" || !q.trim()) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const searchText = q.trim().toLowerCase();
    const lessons = await getCollection("lesson").find({}).toArray();
    const results = lessons.filter((lesson) =>
      [lesson.topic, lesson.location, lesson.price, lesson.space].some((value) =>
        String(value ?? "").toLowerCase().includes(searchText)
      )
    );
    return res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ success: false, message: "Failed to search lessons" });
  }
};

module.exports = { searchLessons };
