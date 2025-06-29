require("dotenv").config();
const express = require("express");
const { connectDB } = require("../Login Format/Data/util");
const userRouter = require("./Routes/userRoute");

const app = express();

// 🔥🔥🔥 MIDDLEWARE MUST COME FIRST! (Routes se pehle)
app.use(express.json()); // JSON data parse karne ke liye
app.use(express.urlencoded({ extended: true })); // Form data ke liye

// Routes
app.use("/api/v1/user", userRouter);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
  connectDB()
    .then(() => {
      console.log("DB Connected");
      console.log(`Server http://${host}:${port} is ready...`);
    })
    .catch(err => {
      console.log("DB Connection Error:", err.message);
    });
});