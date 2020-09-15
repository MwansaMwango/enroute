const express = require("express");
const passport = require("./../../config/passport");
const validator = require("validator");
const User = require("./../../models/User");
const router = express.Router();

const PushNotifications = require("@pusher/push-notifications-server");
const beamsClient = new PushNotifications({
  // instanceId: "6af2ffd6-7acf-4ff5-9099-45bd1624be39",
  // secretKey: "8B9AFA8838E2D7A271D34AF7407DF93B7F7514A1F80DDE49DB12AF8F845C4B3C",
  instanceId: "0bb3f3ca-f205-4863-a264-e0e2264bc4bf",
  secretKey: "7AAD3F24D5B9C2CDF0FF9093EE725E0D5270BD6B67ACD616CB77499FFE95E184",
});

router.post("/register", (req, res, next) => {
  const validationErrors = [];
  // validator is expecting a string
  if (!validator.isEmail(req.body.email || ""))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password || "", { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.password_again)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    return res.status(422).json({
      errors: validationErrors,
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).json({
        errors: [
          {
            msg: "Account with that email address already exists.",
          },
        ],
      });
    }
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({
          data: user,
        });
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).json({
        errors: [
          {
            msg: info.msg,
          },
        ],
      });
    }
    console.log({ user });
    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [{ msg: err }],
        });
      }
      res.json({
        data: user,
      });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  // beamsClient.stop().catch(console.error); // Stop sending notifications to the browser, disassociate the browser from that user
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      res.json({
        data: {
          error: "Failed to destroy the session during logout.",
          err,
        },
      });
    }
    req.user = null;
    res.json({
      data: {
        message: "success",
      },
    });
  });
});

module.exports = router;
