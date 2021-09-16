import jwt from "jsonwebtoken";

const { TokenExpiredError } = jwt;
import Roles from "../constants/roles.js";

const auth = (req, res, next) => {
  let token = req.headers["x-access-token"]; // or authorization header
  if (!token) return res.status(403).send({ message: "No token provided!" });

  try {
    req.decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(40).json({ error: "expired token." });
    return res.sendStatus(401).send({ message: "Unauthorized!" });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (
      !Object.values(Roles).includes(role) ||
      req.decodedToken.role !== role
    ) {
      return res
        .status(400)
        .json({ error: `This route requires ${role} role.` });
    }
    next();
  };
};

export { auth, checkRole };
