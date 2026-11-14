
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.static(path.join(__dirname, "public")));
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

app.post("/api/subscribe", (req, res) => {
  res.status(201).json({
    subscribed: true
  });
});

app.get("/api/admin", (req, res) => {
  res.status(403).json({
    error: "Forbidden"
  });
});
app.get("/api/stats", (req, res) => {
  res.json({
    requestsServed: requestsServed
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      error: "Not found"
    });
  }

  next();
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 