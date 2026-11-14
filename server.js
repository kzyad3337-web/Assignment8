
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

app.get("/hello", (req, res) => {
  res.send("Hello! My name is ZIAD KHALED. Welcome to my Web Programming Assignment 8.");
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow:");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 