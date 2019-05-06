const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "prjctsatu1@gmail.com",
    clientId:
      "483078624779-6h40fa4dvqd5ti1riqcikcdno37vf48p.apps.googleusercontent.com",
    clientSecret: "HsFcbAwRnDLVEI3E_bOaht_L",
    refreshToken: "1/bHtKQwWuqoOO8FmXoKGDsIMgK8Terv9R91ZBRFRP1bY"
  }
});

const verifyMail = (email, name) => {
  transport.sendMail(
    {
      from: "Project 1 <prjctsatu1@gmail.com>",
      to: "panca.saiful10@gmail.com",
      subject: "VERIFIKASI",
      html: `
          <p>Hello ${name}, please click the link for verify your email</p>
          <a href='http://localhost:2019/verify?email=${email}'>Verifikasi Email</a>
      `
    },
    (err, result) => {
      if (err) console.log(err.message);
    }
  );
};

module.exports = { verifyMail };
