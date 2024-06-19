const express = require("express");
const authRoutes = require("./routes/authRoutes");
const config = require("./config/index");
const dbConnection = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use("/api/v1", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
