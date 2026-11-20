const { ObjectId } = require("mongodb");


function toObjectId(value) {
  if (typeof value !== "string" || !/^[0-9a-fA-F]{24}$/.test(value)) {
    return null;
  }
  return new ObjectId(value);
}

module.exports = { toObjectId };
