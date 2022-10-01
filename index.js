import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./routers/categories.router.js";
import gameRouter from "./routers/game.router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);
app.use(gameRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
