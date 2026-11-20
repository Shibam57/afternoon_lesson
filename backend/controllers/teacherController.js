const { getCollection } = require("../db/mongoDB.js");
const { toObjectId } = require("../db/objectId.js");

// POST teachers
const createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, lessonIDs } = req.body || {};
    console.log(firstName)
    if (
      typeof firstName !== "string" || !firstName.trim() ||
      typeof lastName !== "string" || !lastName.trim() ||
      !Array.isArray(lessonIDs) || lessonIDs.length === 0
    ) {
      return res.status(400).json({ success: false, message: "Valid teacher details and lessons are required" });
    }

    const ids = [...new Set(lessonIDs.map((id) => typeof id === "string" ? id.toLowerCase() : id))];
    if (!ids.every((id) => toObjectId(id))) {
      return res.status(400).json({ success: false, message: "Invalid lesson ID" });
    }
    const objectIds = ids.map((id) => toObjectId(id));
    const count = await getCollection("lesson").countDocuments({ _id: { $in: objectIds } });
    if (count !== objectIds.length) {
      return res.status(404).json({ success: false, message: "One or more lessons not found" });
    }

    const now = new Date();
    const teacher = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      lessonIDs: objectIds,
      createdAt: now,
      updatedAt: now
    };
    const result = await getCollection("teacher").insertOne(teacher);
    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher: { _id: result.insertedId, ...teacher }
    });
  } catch (error) {
    console.error("Create teacher error:", error);
    return res.status(500).json({ success: false, message: "Failed to create teacher" });
  }
};

// GET teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await getCollection("teacher").find({}).toArray();
    return res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error("Get teachers error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch teachers" });
  }
};

// GET teachers id lessons 
const getTeacherLessons = async (req, res) => {
  try {
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid teacher ID" });

    const teacher = await getCollection("teacher").findOne({ _id: id });
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const lessonIDs = (teacher.lessonIDs || []).map((value) =>
      typeof value === "string" ? toObjectId(value) : value
    ).filter(Boolean);
    const lessons = lessonIDs.length
      ? await getCollection("lesson").find({ _id: { $in: lessonIDs } }).toArray()
      : [];
    const byId = new Map(lessons.map((lesson) => [lesson._id.toString(), lesson]));
    
    const orderedLessons = lessonIDs.map((lessonID) => byId.get(lessonID.toString())).filter(Boolean);

    return res.status(200).json({
      success: true,
      teacher: { firstName: teacher.firstName, lastName: teacher.lastName },
      lessons: orderedLessons
    });
  } catch (error) {
    console.error("Get teacher lessons error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch teacher lessons" });
  }
};

module.exports = { createTeacher, getAllTeachers, getTeacherLessons };
