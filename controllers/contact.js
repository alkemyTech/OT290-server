const { Contact } = require("../models");
const { Organization } = require("../models");
const { validationResult } = require("express-validator");
const { sendContactEmail } = require("../helpers/email");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.send(contacts);
  } catch (error) {
    res.send(error);
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.sendStatus(404);
    }
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBackContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.render("contacts", { contacts });
  } catch (error) {
    res.send(error);
  }
};

const createContact = async (req, res) => {
  // try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, message } = req.body;
  const organization = await Organization.findByPk(1);
  await sendContactEmail(
    email,
    organization.facebook,
    organization.linkedIn,
    organization.instagram
  );
  const contact = await Contact.create({
    name,
    phone,
    email,
    message,
  });

  res.send(contact);
};

const updateContact = async (req, res) => {
  // try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, message } = req.body;
  const contact = await Contact.update({
    name,
    phone,
    email,
    message,
  });

  return { contact };
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteContact = await Contact.findByPk(id);
    if (!deleteContact) {
      return res.sendStatus(404);
    }

    await Contact.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json(deleteContact);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getBackContacts,
};
