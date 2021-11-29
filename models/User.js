const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  alltasks: [
    {
      tasks: {
        type: String,
      },
      iscompleted: {
        type: Boolean,
        default: false,
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
module.exports = mongoose.model("user", userShema);