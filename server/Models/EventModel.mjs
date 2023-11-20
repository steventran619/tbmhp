// user.mjs
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event name is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Event start date is required"],
  },
  endDate: {
    type: Date,
    required: [false],
  },
  description: {
    type: String,
    required: [true, "Description of the event is required"],
  },
  location: {
    type: String,
    required: [true, "Location of the event is required"],
  },
  photo: {
    type: String,
    required: [false, "Location of the event is required"],
  },
  paidEvent: {
    type: Boolean,
    required: [true, "Paid event is required"],
  }
});


function createEventModel(conn) {
  return conn.model("Event", eventSchema);
}

export { createEventModel };