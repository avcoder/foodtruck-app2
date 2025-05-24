import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/",
  successFlash: "👋 Welcome back",
  failureRedirect: "/login",
  failureFlash: "⚠️ Invalid Login",
});

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "👋 You have logged out");
  res.redirect("/");
};

export default {
  login,
  logout,
};
