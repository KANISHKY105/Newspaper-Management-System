const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({

  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", 
  required: true, 
  },
  name: {
    type: String,
    unique: false,
  },
  address: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate:{
    type: Date,
  }
});


module.exports = mongoose.model("userInfo", userInfoSchema);
