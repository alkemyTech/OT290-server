const { Buffer } = require("node:buffer");
const base64 = require("base-64");

/**
 *
 * @param {*} data String con formato "data:image/png;base64,iVBO"
 */
const decodeImage = (data) => {
  let tipoMime, cadenaBase64;
  [tipoMime, cadenaBase64] = data.split(";");
  let extension = tipoMime.split("/")[1];
  let datos = Buffer.from(base64.decode(cadenaBase64.substring(7)));
  return {
    extension,
    datos,
  };
};

module.exports = {
  decodeImage,
};
