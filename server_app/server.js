import express from "express";
import cors from "cors";
import morgan from "morgan";

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

// Start development server...
app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});
