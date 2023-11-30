import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-255c3.appspot.com/o/9440461.jpg?alt=media&token=5671dd7c-f6d9-478b-8149-dcde4164a329",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
