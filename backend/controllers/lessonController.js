const { getCollection } = require("../db/mongoDB.js");
const { toObjectId } = require("../db/objectId.js");

// POST lessons

const createLesson = async (req, res) => {
  try {
    const { topic, location } = req.body || {};

    
    const rawPrice = req.body?.price;
    const rawSpace = req.body?.space;

    const price =
      rawPrice !== undefined &&
      rawPrice !== null &&
      String(rawPrice).trim() !== ""
        ? Number(rawPrice)
        : NaN;

    const space =
      rawSpace !== undefined &&
      rawSpace !== null &&
      String(rawSpace).trim() !== ""
        ? Number(rawSpace)
        : NaN;

    
    const image = req.file
      ? `/images/${req.file.filename}`
      : typeof req.body?.image === "string"
        ? req.body.image
        : "";

    
    if (
      typeof topic !== "string" ||
      !topic.trim() ||
      typeof location !== "string" ||
      !location.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(space) ||
      space < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid lesson details"
      });
    }

    const now = new Date();

    const lesson = {
      topic: topic.trim(),
      location: location.trim(),
      price,
      space,
      image,
      createdAt: now,
      updatedAt: now
    };

    
    const result = await getCollection("lesson").insertOne(lesson);

    return res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson: {
        ...lesson,
        _id: result.insertedId
      }
    });

  } catch (error) {
    console.error("Create lesson error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create lesson"
    });
  }
};

// GET lessons
const getAllLessons = async (req, res) => {
  try {
    const lessons = await getCollection("lesson").find({}).toArray();
    return res.status(200).json(lessons);
  } catch (error) {
    console.error("Get lessons error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch lessons" });
  }
};

// PUT lessonsid
const updateLesson = async (req, res) => {
  try {
    const id = toObjectId(req.params.id);
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid lesson ID" });
    }

    const updates = req.body;
    const allowedFields = ["topic", "location", "price", "space", "image"];
    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
      return res.status(400).json({ success: false, message: "Invalid update fields" });
    }
    const fields = Object.keys(updates);
    if (!fields.length || fields.some((field) => !allowedFields.includes(field))) {
      return res.status(400).json({ success: false, message: "Invalid update fields" });
    }

    
    const validated = {};
    for (const field of fields) {
      const value = updates[field];
      if (field === "topic" || field === "location") {
        if (typeof value !== "string" || !value.trim()) {
          return res.status(400).json({ success: false, message: `Invalid ${field}` });
        }
        validated[field] = value.trim();
      } else if (field === "price") {
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
          return res.status(400).json({ success: false, message: "Invalid price" });
        }
        validated.price = value;
      } else if (field === "space") {
        if (!Number.isInteger(value) || value < 0) {
          return res.status(400).json({ success: false, message: "Invalid space" });
        }
        validated.space = value;
      } else if (field === "image") {
        if (typeof value !== "string") {
          return res.status(400).json({ success: false, message: "Invalid image" });
        }
        validated.image = value;
      }
    }
    validated.updatedAt = new Date();

    const lesson = await getCollection("lesson").findOneAndUpdate(
      { _id: id },
      { $set: validated },
      { returnDocument: "after" }
    );

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }
    return res.status(200).json({ success: true, message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error("Update lesson error:", error);
    return res.status(500).json({ success: false, message: "Failed to update lesson" });
  }
};

module.exports = { createLesson, getAllLessons, updateLesson };
