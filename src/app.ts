import express from "express";
// import express from "express";
import mongoose from "mongoose";
import users from "./routes/users";
import cards from "./routes/cards";

import { addOwnerCard } from "./controllers/cards";
import { errorHandler } from "./handlers/error-handler";

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

mongoose.connect(MONGO_URL);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(addOwnerCard);

app.use("/", users, cards);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
