const nodemailer = require("nodemailer");
const UserList = require("../models/UserList");
const User = require("../models/User");

const sendEmailToList = async (req, res) => {
  const { subject, body } = req.body;
  const listId = req.params.listId;
  const userList = await UserList.findById(listId).populate("users");

  // Create a map of default values from custom properties
  const defaultValues = {};
  userList.customProperties.forEach(prop => {
    defaultValues[prop.title] = prop.defaultValue;
  });
  console.log(defaultValues);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const sendEmailPromises = userList.users.map(async (user) => {
    let emailBody = body;

    // Replace custom properties in the email body
    for (const [key, value] of user.properties.entries()) {
      emailBody = emailBody.replace(`[${key}]`, value);
    }

    // Replace default values for any missing properties
    for (const [key, value] of Object.entries(defaultValues)) {
      if (!user.properties.has(key)) {
        emailBody = emailBody.replace(`[${key}]`, value);
      }
    }

    // Replace standard fields
    emailBody = emailBody
      .replace("[name]", user.name)
      .replace("[email]", user.email)
      .replace("[city]", user.properties.get('city') || defaultValues['city']);  // Use user city or default city

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
