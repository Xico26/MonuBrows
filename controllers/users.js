const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (e) => {
      if (e) {
        return next(e);
      }
      req.flash("success", "Welcome to MonuBrows!");
      res.redirect("/monuments");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome!");
  const redirectUrl = res.locals.returnTo || "/monuments";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout(function (e) {
    if (e) {
      return next(e);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/monuments");
  });
};