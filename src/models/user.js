import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  refresh_token: String,
});

userSchema.methods.createRefreshToken = async function () {
  const refreshToken = jwt.sign(
    {
      username: this.username,
      id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.jwtRefreshExpiration }
  );

  this.refresh_token = refreshToken;
  await this.save();
  return refreshToken;
};

userSchema.methods.createAccessToken = async function () {
  const accessToken = jwt.sign(
    {
      username: this.username,
      id: this._id,
      role: this.role,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.jwtExpiration }
  );

  return accessToken;
};

userSchema.methods.verifyExpiration = async () => {
  const { exp } = jwt.verify(
    this.refresh_token,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  return exp < (new Date().getTime() + 1) / 1000;
};

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.refresh_token;
    return ret;
  },
};

const User = mongoose.model("User", userSchema);

export default User;
