const client = require('@sendgrid/mail');
const path = require('path');
const ejs = require('ejs');

const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

const sendRegistrationEmail = async (to, firstName, lastName, facebook, linkedIn, instagram) => {
  try {
    client.setApiKey(SENDGRID_API_KEY);
    let emailTemplate;
    ejs.renderFile(path.join(__dirname, '..', 'views', 'email-template.ejs'), 
    { firstName, lastName, facebook, linkedIn, instagram })
    .then(result => {
      emailTemplate = result;
      const message = {
        to,
        from: SENDGRID_SENDER,
        subject: "Welcome link",
        html: emailTemplate
        };
      return client.send(message)
      })
  } catch (error) {
    return res.status(500).json(error);
  }
};

const sendContactEmail = async (to, facebook, linkedIn, instagram) => {
  try {
    client.setApiKey(SENDGRID_API_KEY);
    let emailTemplate;
    ejs.renderFile(path.join(__dirname,'..', 'views', 'contact.ejs'), 
    { facebook, linkedIn, instagram })
    .then(result => {
      emailTemplate = result;
      const message = {
        to,
        from: SENDGRID_SENDER,
        subject: "Welcome link",
        html: emailTemplate
        };
      return client.send(message)
      })
  } catch (error) {
    return res.status(500).json(error);
  }
};
  
module.exports = { sendRegistrationEmail, sendContactEmail };
