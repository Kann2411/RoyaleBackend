const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

export default async (username, email, preSubject, message) => {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAUTH2',
          user: 'royalgames2025@gmail.com',
          pass: 'ulvh npsv lydd ante',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: '"RoyalGames.me!!" <royalgames2025@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `${preSubject}`,
        //text: `${message}`, // plain text body
        html: `${message}`, // html body
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('después de enviar', result);

      return result;
    } catch (error) {
      throw new Error(`Error al enviar correo. ${error.message}`);
    }
  }
  sendMail()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((result) => '¡Envío exitoso!')
    .catch((error) => error.message);
};
