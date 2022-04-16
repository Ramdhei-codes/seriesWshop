const config = require('./config');
const port = config.port;

const express = require('express');
const mongoose = require('mongoose');

const routerApi = require('./src/routes');
const sendEmails = require('./src/mails/mailgunSend');
const app = express();

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/handlers/errors.handler');

//IMPORT TWILIO ENV
const accountSID = config.twilioSID;
const authToken = config.twilioAuth;
const client = require('twilio')(accountSID, authToken);

client.messages
  .create({
    body: 'Test from app using twilio',
    from: '+15183636899',
    to: '+573103476848',
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.error(err.message));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Successful connection'))
  .catch((err) => console.error(err));

app.use(express.json());

app.post('/api/v1/email', async (req, res, next) => {
  try {
    const data = req.body;
    console.log(req.body);
    const response = await sendEmails.sendOrderSerie(data);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
