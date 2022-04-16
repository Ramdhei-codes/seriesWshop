require('dotenv').config();

module.exports = {
  mongoDBConnection: process.env.MONGODB_CONNECTION_STRING,
  twilioSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuth: process.env.TWILIO_AUTH_TOKEN,
  mailGunKey: process.env.MAILGUN_KEY,
  mailGunDomain: process.env.MAILGUN_DOMAIN,
  port: process.env.PORT
};
