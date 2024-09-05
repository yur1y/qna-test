import express from "express";
import Router from "./config/routes";
import { connect } from "./config/db";
import applyMiddleware from "./config/middleware";

connect();

const app = express();
const port = 8080 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

applyMiddleware(app);
app.use(Router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
