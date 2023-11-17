// user.mjs
import mongoose from "mongoose";

const eventFormModelSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true]
  },
  address: {
    type: String,
    required: [false],
  },
  age: {
    type: Number,
    required: [false],
  },
  phone: {
    type: String,
    required: [false],
  },
  shirtSize: {
    type: String,
    required: [false],
  },
});


function createEventFormModel(conn) {
  return conn.model("EventForm", eventFormModelSchema);
}

export { createEventFormModel };