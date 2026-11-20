const { getCollection } = require("../db/mongoDB.js");
const { toObjectId } = require("../db/objectId.js");

// GET enrolment lessonid 
const getEnrolment = async (req, res) => {
  try {
    const { lessonid } = req.params;
    const id = toObjectId(lessonid);
    if (!id) return res.status(400).json({ message: "Invalid lesson ID" });

    const lessonExists = await getCollection("lesson").findOne({ _id: id });
    if (!lessonExists) return res.status(404).json({ message: "Lesson not found" });

    const result = await getCollection("order").aggregate([
      { $unwind: "$items" },
      { $match: { "items.lessonId": id } },
      { $group: { _id: null, enrolment: { $sum: "$items.quantity" } } }
    ]).toArray();

    return res.status(200).json({ lessonId: lessonid, enrolment: result[0]?.enrolment || 0 });
  } catch (error) {
    console.error("Enrolment error:", error);
    return res.status(500).json({ message: "Failed to get enrolment" });
  }
};

module.exports = { getEnrolment };
