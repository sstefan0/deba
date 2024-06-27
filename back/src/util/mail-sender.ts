import nodemailer from "nodemailer";
import { google } from "googleapis";
import { number } from "yup";
// import { generateQRCode } from "./qr-generator";

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
        }
        h1 {
          color: #333;
        }
        p {
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Password Reset</h1>
        <p>Hello, ${name}</p>
        <p>We received a request to reset your password. Click the button below to reset your password.</p>
        <p><a href="http://localhost:5173/resetPassword/${token}" class="button">Reset Password</a></p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Thank you,</p>
        <p>EventPass</p>
      </div>
    </body>
    </html>
    `;
};

// export const generateHTMLConfirmationMessage = async (
//   eventTitle: string,
//   eventLocation: string,
//   eventDate: string,
//   price: number,
//   dateTime: string,
//   ticketType: string,
//   noOfPeople: number
// ) => {
//   return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>QR Code Email</title>
//     </head>
//     <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
//       <div style="max-width: 600px; margin: auto; padding: 20px;">
//         <h2 style="text-align: center;">Ticket purchase confirmation</h2>
//         <h3 style="text-align: center;>Event info:</h3>
//         <p style="text-align: center;">Event: ${eventTitle}<br>Ticket type: ${ticketType}<br>For: ${noOfPeople} ${
//     +noOfPeople < 2 ? "person" : "people"
//   }<br>Location: ${eventLocation}<br>Date: ${eventDate}<br>Price: ${
//     price + " KM"
//   }<br>Purchase time: ${dateTime}</p>
//         <p style="text-align: center;">Please scan the QR code below to validate your ticket:</p>
//         <div style="text-align: center;">
//           <img src="cid:qrCodeImage" alt="QR Code" style="display: block; margin: 0 auto;">
//         </div>
//       </div>
//     </body>
//     </html>`;
// };

// export const generatePdfHTML = async (
//   ticketId: string,
//   eventTitle: string,
//   eventLocation: string,
//   eventDate: string,
//   price: number,
//   dateTime: string,
//   ticketType: string,
//   noOfPeople: number
// ) => {
//   return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>QR Code Email</title>
//     </head>
//     <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
//       <div style="max-width: 600px; margin: auto; padding: 20px;">
//         <h2 style="text-align: center;">Ticket purchase confirmation</h2>
//         <h3 style="text-align: center;>Event info:</h3>
//         <p style="text-align: center;">Event: ${eventTitle}<br>Ticket type: ${ticketType}<br>For: ${noOfPeople} ${
//     +noOfPeople < 2 ? "person" : "people"
//   }<br>Location: ${eventLocation}<br>Date: ${eventDate}<br>Price: ${
//     price + " KM"
//   }<br>Purchase time: ${dateTime}</p>
//         <p style="text-align: center;">Please scan the QR code below to validate your ticket:</p>
//         <div style="text-align: center;">
//           <img src="${await generateQRCode(
//             ticketId
//           )}" alt="QR Code" style="display: block; margin: 0 auto;">
//         </div>
//       </div>
//     </body>
//     </html>`;
// };
