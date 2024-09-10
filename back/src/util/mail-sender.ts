import nodemailer from "nodemailer";
import { google } from "googleapis";

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: {
    filename: string;
    content: string | undefined;
    encoding: string;
    cid: string;
  }[];
}

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token.");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER_EMAIL,
      accessToken: accessToken as string,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  return transporter;
};

export const sendEmail = async (emailOptions: EmailOptions) => {
  let emailTransporter = await createTransporter();
  return await emailTransporter.sendMail(emailOptions);
};

export const generateHTMLResetMessage = (
  name: string,
  token: string
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: #232323;
        }
        h1 {
          color: #fff;
        }
        p {
          margin-bottom: 20px;
          color: #ffffff;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #1976d2;
          color: #fff !important;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Promjena lozinke</h1>
        <p>Zdravo, ${name}</p>
        <p>Primili smo vaš zahtjev za promjenu lozinke. Klikom na dugme ispod nastavljate proces promjene lozinke.</p>
        <p><a href="http://localhost:5173/resetPassword/${token}" class="button">Promjena Lozinke</a></p>
        <p>Ukoliko niste uputili zahtjev za promjenu lozinke ignorišite ovaj email.</p>
        <p>,</p>
        <p>Turizam</p>
      </div>
    </body>
    </html>
    `;
};
