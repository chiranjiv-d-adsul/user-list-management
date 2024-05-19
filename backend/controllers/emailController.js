const nodemailer = require("nodemailer");
const UserList = require("../models/UserList");

const sendEmailToList = async (req, res) => {
  const { subject, body } = req.body;
  const listId = req.params.listId;
  const userList = await UserList.findById(listId).populate("users");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const sendEmailPromises = userList.users.map(async (user) => {
    let emailBody = body;
    for (const [key, value] of Object.entries(user.properties || {})) {
      emailBody = emailBody.replace(`[${key}]`, value);
    }
    emailBody = emailBody
      .replace("[name]", user.name)
      .replace("[email]", user.email)
      .replace("[city]", user.properties.city);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject,
      text: emailBody,
    });
  });

  await Promise.all(sendEmailPromises);

  res.send({ message: "Emails sent successfully" });
};

module.exports = { sendEmailToList };
