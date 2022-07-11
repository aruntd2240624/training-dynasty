const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../utils/authenticateToken");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if(!name) return res.status(401).send({error:"Name is requred"})
  if(!email) return res.status(401).send({error:"Email is requred"})
  if(!password) return res.status(401).send({error:"Password is requred"})

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  await user.save();
  res.send({
    message: "Registration successfull please login!",
  });
});




//Login with token generator
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.send("Email field required");
  if (!password) return res.send("Password field required");

  const user = await Users.findOne({ email }).populate("role");

  if (!user) return res.send("User details not found");

  const validate = await bcrypt.compare(password, user.password);

  if (!validate) return res.send("Email or Password is wrong");

  let token;

  try {
    token = jwt.sign(
      { id: user._id, email: user.email,level: user.role.level || null },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    console.log(error);
    return res.send("Something went wrong please try later");
  }

  res.send({
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});


module.exports = router;
