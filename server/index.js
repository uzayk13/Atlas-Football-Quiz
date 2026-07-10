require("dotenv").config();
const express = require("express");
const cors = require("cors");
const gameRouter = require("./routes/game");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", gameRouter);

app.listen(PORT, () => console.log(`Atlas FC Quiz API running on http://localhost:${PORT}`));
