import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import Roles from "../constants/roles.js";

const { TokenExpiredError } = jwt;

const signup = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    role: Roles.User,
  });

  await user.save();

  const refresh = await user.createRefreshToken();
  const access = await user.createAccessToken();

  res.status(201).json({ user, tokens: { refresh, access } });
};

const signout = async (req, res) => {
  let refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) return res.status(403).send({ error: "Unauthorized." });

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id);
    if (user.refresh_token !== refreshToken)
      return res.status(400).json({ error: "Invalid token" });

    user.refresh_token = null;
    await user.save();
    return res.status(200).json();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(400).json({ error: "Expired token." });
    return res.status(401).json({ message: "Unauthorized." });
  }
};

const signin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).send({ message: "User not found." });
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid)
    return res.status(401).send({ error: "Invalid password." });

  const refresh = await user.createRefreshToken();
  const access = await user.createAccessToken();
  res.send({ user, tokens: { refresh, access } });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.headers["x-refresh-token"];

  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token is required." });

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id);

    if (user.refresh_token !== refreshToken)
      return res.status(403).json({ message: "Invlaid token." });

    const accessToken = await user.createAccessToken();

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(400).json({ error: "Expired token." });
    return res.status(401).json({ message: "Unauthorized." });
  }
};

export default { signup, signin, signout, refreshToken };
