const { Role } = require('../models');

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getRole = async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role) {
        return res.sendStatus(404);
      }
      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const role = await Role.create({ name, description });
    role.save();
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.sendStatus(404);
    }

    const update = await Role.update({ name, description }, {
      where: {
        id,
      },
    });
    const roleUpdated = await Role.findByPk(id);
    return res.status(200).json(roleUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.sendStatus(404);
    }
    await Role.destroy({
      where: {
        id,
      },
    });
    const roleDeleted = await Role.findByPk(
      id,
      {
        paranoid: false,
      },
    );
    return res.status(200).json(roleDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getRoles, getRole, createRole, updateRole, deleteRole,
};