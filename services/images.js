/**
 * 
 * @param {*} data String con formato "data:image/png;base64,iVBO"
 */
const decodeImage = (data) => {
  let general = data.split(';');
  let tipoImagen = general[0].split('/')[1];
  let datos = general[1].split(',')[1];
  return [tipoImagen,datos];
}


module.export = {
  decodeImage,
}