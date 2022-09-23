const { Organization } = require('../models');
const { Slides } = require('../models');

const getSlides = async (req, res) => {
  const { id } = req.params;
  await Slides.findAll({
    where: { organizationId: id},
    order: [['order','ASC']],
  })
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

module.exports = {
  getSlides,
};