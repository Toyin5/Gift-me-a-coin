import app from "./app";
import connectDB from "./config/database";
import logger from "./utils/logger";

const port = process.env.PORT || 8080;

app.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.listen(port, async () => {
  await connectDB();
  logger.info(`Server running on http://localhost:${port}`);
});
