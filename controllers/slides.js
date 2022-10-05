const { Slides } = require("../models");

const { uploadFileS3, deleteFileS3 } = require("../services/S3storage");
const { decodeImage, generateImageName } = require("../services/images");

const getSlides = async (req, res) => {
  await Slides.findAll()
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

const getSlide = async (req, res) => {
  const { id } = req.params;
  await Slides.findByPk(id)
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createSlide = async (req, res) => {
  try {
    const { image, text, organization_id } = req.body;
    let { order } = req.body;
    let imageInfo = decodeImage(image);

    let imageTimestamp = Date.now();

    let imageUrl = await uploadFileS3(
      imageInfo.datos,generateImageName('slide', imageTimestamp, imageInfo.extension)
    );
    if (!order) {
      order = await Slides.count({
        where: {
          organizationId: organization_id,
        },
      });
      order++;
    }
    const newSlide = await Slides.create({
      imageUrl,
      text,
      order,
      organizationId: organization_id,
    });
    newSlide.save();
    return res.status(201).json(newSlide);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, text, order, organization_id } = req.body;
    const slideFound = await Slides.findByPk(id);
    if (!slideFound) {
      return res.status(404).send({ message: "Slide inexistente" });
    }
    await deleteFileS3(slideFound.imageUrl);
    let imageInfo = decodeImage(image);
    let imageTimestamp = Date.now();
    let imageUrl = await uploadFileS3(
      imageInfo.datos,generateImageName('slide', imageTimestamp, imageInfo.extension)
    ); 
    await Slides.update(
      { imageUrl, text, order, organization_id },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(204).json(slideFound);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slideFound = await Slides.findByPk(id);
    if (!slideFound) {
      return res.status(404).send({ message: "Slide Inexistente" });
    }
    await deleteFileS3(slideFound.imageUrl);
    await Slides.destroy({
      where: {
        id: id,
      },
    });
    return res.status(204).json(slideFound);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getSlides,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide,
};
