
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

let requestsServed = 0;

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(
    `[${timestamp}] ${req.method} ${req.url}`
  );

  requestsServed++;

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
