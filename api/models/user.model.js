import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
  },
  { timestamps: true }
);



// post middleware
userSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      // Specify your email service or SMTP details here
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    // HTML content with CSS styles
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333333;
              text-align: center;
            }
            .message {
              margin-top: 20px;
              font-size: 18px;
            }
            .cta {
              margin-top: 20px;
              text-align: center;
            }
            .cta a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to RealEstate Platform</h1>
            <div class="message">
              <p>Hello ${doc.username},</p>
              <p>You can buy or rent your property here.</p>
            </div>
            <div class="cta">
              <a href="https://example.com">Explore Properties</a>
            </div>
          </div>
        </body>
      </html>
    `;

    //send mail
    let info = await transporter.sendMail({
      from: 'piyushlavekar0905@gmail.com', // Enter sender's email address
      to: doc.email,
      subject: "Welcome to RealEstate Platform!",
      html: htmlContent,
    });

    console.log("INFO of mail", info);
  }
  catch (error) {
    console.error(error);
  }
});



const User = mongoose.model('User', userSchema);

export default User;
