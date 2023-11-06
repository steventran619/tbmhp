// user.mjs
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Your firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Your lastname is required"],
  },
  active: {
    type: Boolean,
    default: false,
  }
});

function createNewsletterSubscriberModel(conn) {
  return conn.model("NewsletterSubscriber", newsletterSubscriberSchema);
}

export { createNewsletterSubscriberModel };