const { Testimonials } = require('../models/testimonials');

const getTestimonials = async (req, res) => {
  await Testimonials.findAll()
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((err) => {
      return res.status(500).send({'message':'Error Inesperado...'});
    });
};

const getTestimonial = async(req,res) => {
  const { id } = req.params;
  await Testimonials.findByPk(id)((item) => {
		return res.status(200).send(item);
	}).catch((err) => {
    console.log(err);
    return res.status(500).send({'message':'Error Inesperado...'});
	});
}

const createTestimonial = async (req, res) => {
  try {
    const { name, image, content } = req.body;
    const testimonials = await Testimonials.create({
      name,
      image,
      content
    });
    testimonials.save();
    return res.status(201).json(testimonials);
  } catch (err) {
    return res.status(500);
  }
};

const updateTestimonial = async (req,res) => {
  try {
    const { id } = req.params;
    const { name, image, content } = req.body;
    const testimonialFound = await Testimonials.findByPk(id);
    if (!testimonialFound) {
      return res.status(404).send({'message':'Testimonio inexistente'});
    }
    await Testimonials.update({ name, image, content }, {
      where: {
        id,
      }
    });
    return res.status(204).send({'message':'Editado exitosamente'});
  } catch (error) {
    return res.status(500).send({'message':'Error Inesperado...'});
  }
}

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonialFound = await Testimonials.findByPk(id);
    if (!testimonialFound) {
      return res.stats(404).send({'message':'Testimonio Inexistente'});
    }
    await Testimonials.destroy({
      where: {
        id,
      }
    });
    return res.status(204).send({'message':'Testimonio Borrado Exitosamente'});
  } catch (error) {
    return res.status(500).send({'message':'Error Inesperado'});
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};