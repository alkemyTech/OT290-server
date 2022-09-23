const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const testimonialsRouter = require("./routes/testimonials");
const membersRouter = require("./routes/members");
const categoriesRouter = require("./routes/categories");
const organizationRouter = require("./routes/organization");
const slidesRouter = require("./routes/slides");
const newsRouter = require("./routes/news");
const commentsRouter = require("./routes/comments");
const { swaggerJsDoc, swaggerUi, swaggerSpec } = require("./services/swagger");
const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/categories", categoriesRouter);
app.use("/members", membersRouter);
app.use("/organization", organizationRouter);
app.use("/slides",slidesRouter);
app.use("/news", newsRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
