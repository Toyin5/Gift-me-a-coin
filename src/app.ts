import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import requestsLogger from "./middlewares/requestsLogger";
import { deserializeUser } from "./middlewares/auth";
import routes from "./routes";
import { rateLimiter } from "./middlewares/security";

const app = express();

app.use(rateLimiter);
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());
app.use(requestsLogger);
app.use(deserializeUser);

app.use("/v1", routes);

export default app;
