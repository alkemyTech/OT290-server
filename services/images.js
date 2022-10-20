const { Buffer } = require("node:buffer");
const base64 = require("base-64");

/**
 *
 * @param {*} data String con formato "data:image/png;base64,iVBO"
 */
const decodeImage = (data) => {
  try {
    let tipoMime, cadenaBase64;
    [tipoMime, cadenaBase64] = data.split(";");
    let extension = tipoMime.split("/")[1];
    let datos = Buffer.from(base64.decode(cadenaBase64.substring(7)));
    return {
      extension,
      datos,
    };
  } catch (error) {
    throw { description: "Formato de imagen no valido" };
  }
};

/**
 *
 * @param {*} entity nombre de la entidad
 * @param {*} extension extension que tendra el archivo
 * @returns string nombre del archivo con la forma [entity]-[timestamp].[extension]
 */

// generateImageName('user', 'png') -> user-12371232323132.png
// generateImageName('slide', 'jpg') -> slide-978612397612947.jpg

const generateImageName = (entity, imageTimestamp, extension) => {
  return `${entity}-${imageTimestamp}.${extension}`;
};

module.exports = {
  decodeImage,
  generateImageName,
};
