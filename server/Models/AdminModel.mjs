// user.mjs
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

function createUserModel(conn) {
  return conn.model("User", userSchema);
}

export { createUserModel };