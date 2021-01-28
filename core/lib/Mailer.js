const { response } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

const sendMail = (subject, recipent, body, type = "text") => {

    let options = null;

    if(type === "html"){
        options = {
            from: process.env.MAIL_FROM,
            to: recipent,
            subject: subject,
            html: body
          };
    }
    else{
        options = {
            from: process.env.MAIL_FROM,
            to: recipent,
            subject: subject,
            text: body
          };
    }
    
    transporter.sendMail(options,(err, response)=>{
            if(err){
                if(process.env.APP_ENV === "dev")
                    console.log("Error while sending Email. Error: ", err.message);
                else
                    console.log("Error while sending Email.");
            }
            else{
                if(process.env.APP_ENV === "dev")
                    console.log("Email sent successfully. Response: ", response);
                else
                    console.log("Email sent successfully.");
            }
    })
}

module.exports = sendMail;