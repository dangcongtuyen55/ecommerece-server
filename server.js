require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes

app.use("/user", require("./routes/userRoute"));
app.use("/api", require("./routes/categoryRoute"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRoute"));

//connect to database
app.get("/", (req, res) => {
  res.json({ msg: "wellcome to my project" });
});

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
