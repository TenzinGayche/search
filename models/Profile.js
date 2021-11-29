const mongoose = require("mongoose");
const ProfileShema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  tasks: [
    {
      alltasks: {
        type: String,
        default: 0,
      },
      completedtasks: {
        type: String,
        default: 0,
      },
      incompletedtasks: {
        type: String,
        default: 0,
      },
      date: {
        year: {
          type: String,
        },
        month: {
          type: String,
        },
        day: {
          type: String,
        },
      },
    },
  ],
});
module.exports = mongoose.model("Profile", ProfileShema);
