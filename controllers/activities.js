const { Activity } = require("../models");
const { validationResult } = require("express-validator");

const createActivity = async (req, res) => {
  try {
    //Nano: Validate errors in request to stop if there's any
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    //Nano: Continue if no errors
    const { name, image, content } = req.body;
    const activity = await Activity.create({
      name,
      image,
      content,
    });
    console.log("activity");
    return res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createActivity };
