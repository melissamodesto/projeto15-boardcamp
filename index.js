import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./routers/categories.router.js";
import gameRouter from "./routers/game.router.js";
import customerRouter from "./routers/customer.router.js";
import rentalsRouter from './routers/rental.router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);
app.use(gameRouter);
app.use(customerRouter);
app.use(rentalsRouter);

app.get("/", (req, res) => {
  res.send("Online");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
