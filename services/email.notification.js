const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID);

const sendEmail = async (req, res) => {
  const { to, from, subject, text, html } = req.body;

  const message = {
    to,
    from,
    subject,
    text,
    html,
  };

  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent ...");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to send email");
    });
};

module.exports = {
  sendEmail,
};
