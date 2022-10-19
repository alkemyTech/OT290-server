const { Organization } = require("../models");
const { Slides } = require("../models");
const { validationResult } = require("express-validator");

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.send(organizations);
  } catch (error) {
    res.send(error);
  }
};

const getOrganization = async (req, res) => {
  // const { id } = req.params;
  const id = 1;
  try {
    const organization = await Organization.findByPk(id, {
      include: [
        {
          model: Slides,
          order: ["order", "ASC"],
        },
      ],
    });
    if (!organization) {
      return res.send("Not found");
    }
    res.send({
      ...organization.dataValues,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  } catch (error) {
    res.send(error);
  }
};

const createOrganization = async (req, res) => {
  const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body;

  try {
    const organization = await Organization.create({
      name: name,
      image: image,
      address: address,
      phone: phone,
      email: email,
      welcomeText: welcomeText,
      aboutUsText,
    });

    res.send(organization);
  } catch (error) {
    res.send(error);
  }
};

const updateOrganization = async (req, res) => {
  //Nano: Validate errors in request to stop if there's any
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  //Nano: Continue if no errors
  const id = 1;
  const {
    name,
    image,
    address,
    phone,
    email,
    welcomeText,
    aboutUsText,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  try {
    const [organization, created] = await Organization.findOrCreate({
      where: { id },
      defaults: {
        name,
        image,
        address,
        phone,
        email,
        welcomeText,
        aboutUsText,
        facebook,
        linkedin,
        instagram,
      },
    });

    if (!created) {
      await Organization.update(
        {
          name,
          image,
          address,
          phone,
          email,
          welcomeText,
          aboutUsText,
          facebook,
          linkedin,
          instagram,
        },
        { where: { id } }
      );
    }
    res.send(`Organization updated successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.destroy({ where: { id } });
    if (!organization) {
      return res.send("Not found");
    }
    res.send("Organization delete");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
