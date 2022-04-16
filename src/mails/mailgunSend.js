const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mailgun = new Mailgun(formData);

const config = require('../../config');

const mgClient = mailgun.client({
  username: 'api',
  key: config.mailGunKey,
});

function sendEmailConfirmation() {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div class="row">
          <div class="col">
            <label for="">Prueba desde la app</label>
          </div>
        </div>
        <div class="row">
          <p>
            <small
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
              aliquid necessitatibus laudantium voluptate voluptatibus eum odit
              soluta, aperiam maiores dolore perferendis fuga a dicta facere
              delectus saepe assumenda optio provident!</small
            >
          </p>
        </div>
      </body>
    </html>
    `;
}

function getMessage(emailParams) {
  //Parámetros requeridos para el envío del mail
  return {
    from: emailParams.from,
    to: emailParams.to,
    subject: emailParams.subject,
    text: emailParams.text,
    html: sendEmailConfirmation(),
  };
}

async function sendOrderSerie(emailParams) {
  try {
    await mgClient.messages.create(config.mailGunDomain, getMessage(emailParams));
    return { message: 'Confirmado' };
  } catch (error) {
    const message = 'No se pudo enviar';
    console.error(message);
    console.error(error);
    if (error.response) console.error(error.response.body);
    return { message };
  }
}

module.exports = { sendOrderSerie };
