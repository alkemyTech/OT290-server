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

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.sendStatus(404);
    }
    await Activity.update(body, { where: { id } });
    const updatedActivity = await Activity.findByPk(id);
    return res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createActivity, updateActivity };
