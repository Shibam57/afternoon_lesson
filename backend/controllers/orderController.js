const { getCollection } = require("../db/mongoDB.js");
const { toObjectId } = require("../db/objectId.js");

// POST orders

const createOrder = async (req, res) => {
  try {
    const { name, phone, items } = req.body || {};
    console.log(name)

    if (
      typeof name !== "string" || !/^[A-Za-z ]+$/.test(name.trim()) ||
      typeof phone !== "string" || !/^(?!0+$)[0-9]{10,15}$/.test(phone.trim())
    ) {
      return res.status(400).json({ message: "Invalid customer details" });
    }
    if (
      !Array.isArray(items) || !items.length ||
      items.some((item) =>
        !item || !toObjectId(item.lessonId) ||
        !Number.isInteger(item.quantity) || item.quantity < 1
      )
    ) {
      return res.status(400).json({ message: "Invalid order items" });
    }

    const ids = items.map((item) => item.lessonId.toLowerCase());
    if (new Set(ids).size !== ids.length) {
      return res.status(400).json({ message: "Duplicate lessons are not allowed" });
    }

    const objectIds = ids.map((id) => toObjectId(id));
    const lessons = await getCollection("lesson").find({ _id: { $in: objectIds } }).toArray();
    if (lessons.length !== ids.length) {
      return res.status(404).json({ message: "One or more lessons not found" });
    }

    const quantities = new Map(items.map((item) => [item.lessonId.toLowerCase(), item.quantity]));
    const insufficientSpace = lessons.some(
      (lesson) => quantities.get(lesson._id.toHexString()) > lesson.space
    );
    if (insufficientSpace) {
      return res.status(409).json({ message: "Not enough spaces available" });
    }

    const now = new Date();
    const order = {
      name: name.trim(),
      phone: phone.trim(),
      items: items.map((item) => ({
        lessonId: toObjectId(item.lessonId),
        quantity: item.quantity
      })),
      createdAt: now,
      updatedAt: now
    };
    const result = await getCollection("order").insertOne(order);
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: { _id: result.insertedId, ...order }
    });
  } catch (error) {
    console.error("Order error:", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};



const getAllOrders = async (req, res) => {
  try {
    const orders = await getCollection("order")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};


module.exports = {
  createOrder,
  getAllOrders
};