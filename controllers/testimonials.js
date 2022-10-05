const { Testimonials } = require('../models');

const getTestimonials = async (req, res) => {
  // NUMERO EN STRING
  let { page } = req.query;
  // CONVERSION A INT POR SEGURIDAD
  page = parseInt(page);
  // EN caso de que no se pase por url la pagina, se devolvera un error
  if (!page){ page = -1 }
  const limitPage = 10;
  const offsetPage = 10*(page-1);
  // CONSULTA A LA DB PARA LA CANTIDAD DE REGISTROS
  const {count , rows } = await Testimonials.findAndCountAll({});
  // Valor para saber si existen elementos menores al limitPage
  const ultimaPagina = (count % limitPage) == 0 ? 0:1;  
  const maxPage = Math.floor(count/10)+ultimaPagina;

  const URL = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

  if ((page > maxPage) || (page <= 0)){
    // ERROR IN PAGE ASKED
    const response = {
      nextPage : null,
      items : [],
      previousPage : null
    }
    res.status(404).json(response);
  } else {
    await Testimonials.findAll({
      limit: limitPage,
      offset: offsetPage
    })
      .then((items) => {
        const response = {
          nextPage : (page > maxPage ? null:`${URL}?page=${page++}`),
          items : items,
          previousPage : ( page == 1 ? null:`${URL}?page=${page--}`)
        }
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
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