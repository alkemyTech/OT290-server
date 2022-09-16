const { Members } = require('../models/members');

const getMembers = async (req, res) => {
  await Members.findAll()
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
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

const createMember = async(req,res) => {
  try {
    const { 
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image,
      description
    } = req.body;

    const newmember = await Members.create({
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image,
      description
    });
    newmember.save();
    return res.status(200).json(newmember);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const updateMember = async(req,res) =>{
  try {
    const { id } = req.params;
    const { 
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image,
      description
    } = req.body;

    const updatedmember = await Members.findByPk(id);
    if (!updatedmember) {
      return res.sendStatus(404);
    }

    await Members.update({ name, facebookUrl, instagramUrl, linkedinUrl, image, description }, {
      where: {
        id,
      },
    });
    return res.status(200).json(updatedmember);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const deleteMember = async(req,res) =>{
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
}

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
};