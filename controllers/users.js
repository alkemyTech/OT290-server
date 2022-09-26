const { User } = require("../models");
// Nano: Import bcrypt library to encrypt passwords
const bcrypt = require("bcrypt");

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
  // try {
  const { firstName, lastName, email, password, photo, roleId } = req.body;
  // Nano: Create salt and make hash to encrypt passwords
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
    photo,
    roleId,
  });
  return { ...user.dataValues, password: undefined };
};

const updateUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { firstName, lastName, email, password, photo, roleId } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    if (id == userId) {
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
    } else {
      return res.status(401).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    if (id == userId) {
      await User.destroy({
        where: {
          id,
        },
      });
      const userDeleted = await User.findByPk(id, {
        paranoid: false,
      });
      return res.status(200).json(userDeleted);
    } else {
      return res.status(401).json(error);
    }
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
