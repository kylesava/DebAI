const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const Emitter = require("events");
const cron = require("node-cron");
const { Configuration, OpenAIApi } = require("openai");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// const so
const cors = require("cors");
const Enums = require("./utils/Enums");
const { endTheDebateAfterTwoDays } = require("./services/autoScript");
require("dotenv").config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "PUT", "DELETE", "OPTIONS", "GET"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.set("trust proxy", 1); // trust first proxy
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});

const EventEmiter = new Emitter();
app.set("EventEmitter", EventEmiter);
const openAi = new OpenAIApi(configuration);
module.exports = openAi;

app.use(cookieParser());
app.use(morgan("common"));
app.use(express.json());
require("./utils/db")();
require("./utils/passport");

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "session_user",
  ttl: 31556952000,
  autoRemove: "native",
});
app.use(
  session({
    name: "debatosour.sid",
    secret: "helloworld",
    resave: false,
    saveUninitialized: true,

    store,
    cookie: {
      secure: true,
      maxAge: 31556952000,
      httpOnly: true,
      sameSite:"none"
    },
  })
);

// middlewares
app.use(passport.initialize());
app.use(passport.session());
cron.schedule("0 0 * * *", endTheDebateAfterTwoDays);
io.on("connection", (socket) => {
  console.log("someone connected");
});

EventEmiter.on(Enums.UPDATED_DEBATE, (data) => {
  io.emit(Enums.UPDATED_DEBATE, data);
});
require("./AllRoutes")(app);
server.listen(8000, () => console.log(`server started at port 8000`));
