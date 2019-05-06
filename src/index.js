const express = require("express");
const user = require("./routers/userRouter");
// const product
// const transaction

const app = express();
const port = 2019;

app.use(express.json());
app.use(user);

app.listen(port, () => {
  console.log("Running at ", port);
});
