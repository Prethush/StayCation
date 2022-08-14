const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const mail = {
  user: "prethushak3@gmail.com",
  clientID: process.env.NODEMAILER_CLIENT_ID,
  clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
  refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
};

const OAuth2_client = new OAuth2(
  mail.clientID,
  mail.clientSecret,
  mail.redirectUri
);
OAuth2_client.setCredentials({ refresh_token: mail.refreshToken });

async function send_mail(name, recipient, id) {
  try {
    const accessToken = await OAuth2_client.getAccessToken();
    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: mail.user,
        clientId: mail.clientID,
        clientSecret: mail.clientSecret,
        refreshToken: mail.refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: mail.user,
      to: recipient,
      subject: "Verification mail",
      html: `<h3>Hi ${name}</h3>
        <p>This message is from <span style="color: #FF3366; font-style: italic; font-weight: 700">StayCation</span>.We are sending you a requested password link. Click on this link to create a new password <a href="http://localhost:3000/reset_password/${id}" style="color: #FF3366; text-decoration: #FF3366">Reset Password</a></p>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = send_mail;
