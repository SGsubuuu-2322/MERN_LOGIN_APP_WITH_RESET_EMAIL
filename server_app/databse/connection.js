import mongoose from "mongoose";
import ENV from "../config.js";

export default async function connect() {
  // const mongod = await MongoMemoryServer.create();
  // const getUri = mongod.getUri();

  // mongoose.set("strictQuery", true);

  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Databse Connected!!!");
  return db;
}
