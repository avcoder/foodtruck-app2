import User from "../models/userModel.js";

const register = async ({ username, password, callback }) => {
  const user = new User({ username });
  await User.register(user, password, callback);
};

export default {
  register,
};
