const { Testimonials } = require('../models');

const getTestimonials = async (req, res) => {
  let { page } = req.params;
  if (!page){ page = 1 }
  const URL = `${req.protocol}://${req.get('host')}`;
  
  await Testimonials.findAll({
    limit: 10,
    offset: (10*(page-1))
  })
    .then((items) => {
      const response = {
        nextPage : (items.length < 10 ? `${URL}?page=${page}`:`${URL}?page=${page+1}`),
        items : items,
        previousPage : ( page == 1 ? `${URL}?page=${page}`:`${URL}?page=${page-1}`)
      }
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const getTestimonial = async(req,res) => {
  const { id } = req.params;
  await Testimonials.findByPk(id)((item) => {
		return res.status(200).send(item);
	}).catch((err) => {
    return res.status(500).json(err);
	});
}

/**
 * 
 * @param body.name Nombre del testimonio, NO debe ser vacio.
 * @param body.content Contentido de testimonios, NO debe ser vacio
 * @param body.image Imagen de testimonio, puede ser vacio. 
 * @returns testimonials nuevo item creado
 */
const createTestimonial = async (req, res) => {
  try {
    let { name, image, content } = req.body;
    if (name && content){
      const testimonials = await Testimonials.create({
        name,
        image,
        content
      });
      testimonials.save();
      return res.status(201).json(testimonials);
    } else {
      return res.sendStatus(400);
    }
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
    return res.status(204).json(testimonialFound);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonialFound = await Testimonials.findByPk(id);
    if (!testimonialFound) {
      return res.status(404).send({'message':'Testimonio Inexistente'});
    }
    await Testimonials.destroy({
      where: {
        id,
      }
    });
    return res.status(204).json(testimonialFound);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};