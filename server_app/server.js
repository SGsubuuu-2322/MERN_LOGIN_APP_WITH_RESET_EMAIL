import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./databse/connection.js";
import router from "./router/routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const PORT = 8080;

// HTTP get request
app.get("/", (req, res) => {
  return res.status(200).json("Home GET request...");
});

app.use("/api", router);

// Start development server...

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (err) {
      console.log("Cannot connect to the server...");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...");
  });
