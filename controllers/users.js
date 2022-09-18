const { User } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, photo, roleId } = req.body;
    const user = await User.create({ firstName, lastName, email, password, photo, roleId });
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, photo, roleId } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }

    const update = await User.update(
      { firstName, lastName, email, password, photo, roleId },
      {
        where: {
          id,
        },
      }
    );
    const userUpdated = await User.findByPk(id);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    await User.destroy({
      where: {
        id,
      },
    });
    const userDeleted = await User.findByPk(id, {
      paranoid: false,
    });
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
