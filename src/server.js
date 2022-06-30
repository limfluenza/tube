import express from "express";

const PORT = 4000;

const app = express();

const date = new Date();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const timeLogger = (req, res, next) => {
  console.log(date);
  next();
};

const securityLogger = (req, res, next) => {
  const protocols = req.protocol;
  if (protocols === "http") {
    console.log("insecure");
  } else console.log("secure");
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  next();
};

const handleHome = (req, res, next) => {
  return res.send("<h1> Homepage </h1>");
};

app.use(logger);
app.use(timeLogger);
app.use(securityLogger);
app.use(privateMiddleware);
app.get("/", handleHome);

const handleListening = () =>
  console.log(`Server listenting on port http://localhost${PORT} `);

app.listen(4000, handleListening);
