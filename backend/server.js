const express = require("express");
// const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/teams", require("./routes/teamRoutes"));

// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
