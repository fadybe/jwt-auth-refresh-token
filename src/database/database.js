import mongoose from "mongoose";

import "../models/index.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log("Connected to database...");
  } catch (error) {
    console.log("Could not connect to database.");
    throw error;
  }
};

export default { connect };
