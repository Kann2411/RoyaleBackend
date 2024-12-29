import { BadRequestException } from '@nestjs/common';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

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
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: '"RoyalGames.me!!" <royalgames2025@gmail.com>',
        to: email,
        subject: `${preSubject}`,
        text: `${message}`,
        html: `${message}`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('después de enviar', result);
      return result;
    } catch (error) {
      console.log('Error sending email', error);
      throw new BadRequestException(`Error al enviar correo. ${error.message}`);
    }
  }
  return sendMail();
};
