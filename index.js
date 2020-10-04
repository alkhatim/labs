const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
const trimReqBody = require("trim-request-body");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const postResponse = require("./middleware/postResponse");

const passport = require("passport");
const cors = require("cors");

//Loads the handlebars module
const exphbs = require("express-handlebars");

const users = require("./routes/users");
const auth = require("./routes/auth");
const applications = require("./routes/applications");
const credits = require("./routes/credits");

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
//Enabling cors origin
app.use(cors());

//Prevent NoSQL injections
app.use(mongoSanitize());

//Prevent XSS scripting
app.use(xss());

//Sets our app to use the handlebars engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Rate Limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 10000,
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Set security headers
app.use(helmet());

//Enable cookie parser
app.use(cookieParser());

// Trim the parsed request body.
app.use(trimReqBody);

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//intercept
app.use((req, res, next) => {
  res.on("finish", async () => {
    await postResponse(req, res);
  });
  next();
});

// Passport middleware
app.use(passport.initialize());

//static client app
app.use(express.static("client/build"));

// Use Routes
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/applications", applications);
app.use("/api/v1/credits", credits);
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

//Handle unhandled promise rejections
//This is done to avoid rapping the async await process is db.js with a try-catch block or using .then()
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //Close server & exit process
  server.close(() => process.exit(1));
});
