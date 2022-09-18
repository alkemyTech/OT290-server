const client = require('@sendgrid/mail');

const {
  SENDGRID_API_KEY, SENDGRID_SENDER,
} = process.env;

const sendEmail = async (to) => {
  client.setApiKey(SENDGRID_API_KEY);

  const message = {
    to,
    from: SENDGRID_SENDER,
    personalizations: [{
      to,
    }],
  };
  await client
    .send(message)
    .catch((error) => {
      throw error;
    });
};

module.exports = { sendEmail };
