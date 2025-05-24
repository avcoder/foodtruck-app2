import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: "⚠️ Invalid Login",
});

export default {
  login,
};
