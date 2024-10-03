import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

export default async function connect() {
  // const mongod = await MongoMemoryServer.create();
  // const getUri = mongod.getUri();

  // mongoose.set("strictQuery", true);

  const db = await mongoose.connect("mongodb://localhost:27017/MERN_LOGIN-APP");
  console.log("Databse Connected!!!");
  return db;
}
