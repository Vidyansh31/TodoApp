const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Your Name"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }]
});



module.exports = mongoose.model("User", UserSchema);

