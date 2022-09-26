const { Buffer } = require("node:buffer");
const base64 = require("base-64");

/**
 * 
 * @param {*} data String con formato "data:image/png;base64,iVBO"
 */
const decodeImage = (data) => {
  let general = data.split(';');
  let tipoImagen = general[0].split('/')[1];
  let datos = Buffer.from(base64.decode(data));
  return {
    'extension':tipoImagen,
    'datos':datos
  };
}


module.export = {
  decodeImage,
}