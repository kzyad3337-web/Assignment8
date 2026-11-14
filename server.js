
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

app.get("/old-page", (req, res) => {
  res.redirect("/hello");
});

app.get("/api/courses", (req, res) => {
  const courses = [
    {
      id: 1,
      title: "Web Programming",
      credits: 4
    },
    {
      id: 2,
      title: "Database Management",
      credits: 3
    },
    {
      id: 3,
      title: "Computer Networks",
      credits: 4
    }
  ];

  res.json(courses);
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});


app.get("/api/headers", (req, res) => {
  res.json({
    userAgent: req.get("User-Agent"),
    accept: req.get("Accept")
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 