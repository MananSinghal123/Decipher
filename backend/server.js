const express = require("express");
// const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors"); // Import the cors package

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use("/api/teams", require("./routes/teamRoutes"));

// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
