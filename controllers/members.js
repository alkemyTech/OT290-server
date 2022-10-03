const { Members } = require("../models");
const { validationResult } = require('express-validator');

const getMembers = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get('host') +"/members";
    let { page } = req.query;
    const limit = 10;

    (page) ? page=parseInt(page) : page = 1;
    const offset = 10*(page - 1)
  
    const members = await Members.findAll({
      offset, limit,
    });
    const count = await Members.count();

    let next = null;
    if(count>offset+limit){
       next = url+"?page="+(parseInt(page)+1);
    }
    
    let previous = null;
    if(offset!=0){
      previous = url+"?page="+(parseInt(page)-1);
   }
   
    const response = {
      data:members,
      next,
      previous
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const getMember = async (req, res) => {
  const { id } = req.params;
  await Members.findByPk(id)
    .then((item) => {
      return res.status(200).json(item);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createMember = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } =
      req.body;

    const newmember = await Members.create({
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image,
      description,
    });
    newmember.save();
    return res.status(200).json(newmember);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } =
      req.body;

    const updatedmember = await Members.findByPk(id);
    if (!updatedmember) {
      return res.sendStatus(404);
    }

    await Members.update(
      { name, facebookUrl, instagramUrl, linkedinUrl, image, description },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json(updatedmember);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Members.findByPk(id);
    if (!deletedMember) {
      return res.sendStatus(404);
    }

    await Members.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json(deletedMember);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
