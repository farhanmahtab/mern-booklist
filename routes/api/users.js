const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require("../../middleware/jwt_key");
//user Model
const User = require("../../model/User");
const bcrypt = require("bcrypt");

//Get all User
router.get("/", (req, res) => {
  User
    .find()
    .sort({ price: -1 })
    .then((User) => res.json({
      status: 200,
      User
    }))
    .catch((err) =>
      res.json({
        status: 500,
        error: err,
      })
    );
});

//SignUp User
router.post("/signUp", (req, res) => {
  console.log("SigUp");
  const { name, email } = req.body;
  let { password } = req.body;
  //console.log(key.JWT_KEY);
  bcrypt.hash(password, 12).then((hash) => {
    password = hash;
    const newUser = new User({
      name,
      email,
      password,
    });

    let token = jwt.sign(
      {
        name,
        email,
      },
      key.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    newUser.save().then((user) =>
      res
        .json({
          status: 200,
          message: "Signup successful",
          user,
          token,
        })
        .catch((err) =>
          res.json({
            status: 401,
            message: "SignUp failed",
            error: err,
          })
        )
    );
  });
});

//Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((data) => {
    if (!data) {
      res.status(401).json({
        data: "Invalid email",
      });
    } else {
      //console.log(password, data.password);
      if (!bcrypt.compareSync(password, data.password)) {
        res.status(401).json({
          message: "Invalid email or password",
        });
      } else {
        console.log(data);
        let token = jwt.sign(
          {
            name: data.name,
            email,
          },
          key.JWT_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({
          message: "Signed in!!",
          data,
          token,
        });
      }
    }
  });
});

//Delete User
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((user) =>
      user.deleteOne().then(() =>
        res.json({
          id: req.params.id,
          message: "user Deleted",
        })
      )
    )
    .catch((err) =>
      res.status(404).json({
        message: "user not found",
      })
    );
});

module.exports = router;
