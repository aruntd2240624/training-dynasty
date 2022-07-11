require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const subjectRoutes = require("./routes/subjects")
const streamRoutes = require("./routes/streams")
const rolesRoutes = require("./routes/roles")
const userRoutes = require("./routes/users");
const coursetype = require("./routes/coursetype");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const authenticateToken = require('./utils/authenticateToken');

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/training", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    app.use(express.json())

    app.use("/api/auth", auth)
    //take out the authentication to create the Super Admin Role in First
    //app.use("/api/roles", rolesRoutes)
    app.use("/api/roles",authenticateToken, rolesRoutes)
    //take out the authentication to create the First User
    //app.use("/api/users", userRoutes)
    app.use("/api/users",authenticateToken, userRoutes)
    app.use("/api/coursetype",authenticateToken, coursetype)
    app.use("/api/courses",authenticateToken, courses)
    app.use("/api/subjects",authenticateToken, subjectRoutes)
    app.use("/api/streams",authenticateToken, streamRoutes)

    app.use("/", (req, res) => {
      res.json({
        message: "Hello!",
      });
    });

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
