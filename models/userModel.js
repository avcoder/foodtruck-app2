import mongoose from "mongoose";

import plm from "passport-local-mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(plm);

export default mongoose.model("user", userSchema);
