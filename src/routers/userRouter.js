const router = require("express").Router();
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const { verifyMail } = require("../emails/nodemailer");
const connec = require("../connection/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// REGISTER
router.post("/users", async (req, res) => {
  let sql = `INSERT INTO customers SET ?;`;
  let sql2 = `SELECT * FROM customers;`;
  let data = req.body;

  if (!isEmail(req.body.email)) return res.send("Email is not valid");

  data.password = await bcrypt.hash(req.body.password, 8);

  connec.query(sql, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    verifyMail(data.email, data.first_name);

    connec.query(sql2, (err, result) => {
      if (err) return res.send(err);

      res.send(result);
    });
  });
});

// LOGIN
router.post("/users/login", (req, res) => {
  const sql = `SELECT * FROM customers WHERE email = ?`;
  const { email, password } = req.body;

  connec.query(sql, email, async (err, result) => {
    if (err) return res.send(err.message);

    const user = result[0];
    if (!user)
      return res.send("Invalid Login !, Please check email and password");

    const pass = await bcrypt.compare(password, user.password);
    if (!pass)
      return res.send("Invalid Login !, Please check email and password");

    if (!user.verified) return res.send("Please, Verify your email!");

    res.send(user);
  });
});

// VERIFY
router.get("/verify", (req, res) => {
  let email = req.query.email;
  let sql = `UPDATE customers SET verified = true WHERE email = '${email}'`;
  let sql2 = `SELECT * FROM customers WHERE email = '${email}'`;

  connec.query(sql, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    connec.query(sql2, (err, result) => {
      if (err) return res.send(err.sqlMessage);

      res.send("<h1>Verifikasi berhasil</h1>");
    });
  });
});

module.exports = router;
