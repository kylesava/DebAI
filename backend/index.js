const express = require("express")
const app = express()
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cookieParser = require("cookie-parser")
const { Configuration, OpenAIApi } = require("openai")
const morgan = require("morgan")
const cors = require("cors");
require("dotenv").config()




app.use(cors({
    origin: [
        process.env.FRONTEND_URL
    ],
    methods: ['POST', 'PUT', 'DELETE', 'OPTIONS', 'GET'],
    credentials: true
}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.set('trust proxy', 1) // trust first proxy

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API
});

const openAi = new OpenAIApi(configuration)
module.exports=openAi

app.use(cookieParser())
app.use(morgan("common"))
app.use(express.json())
require("./utils/db")()
require("./utils/passport")

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "session_user",
    ttl: 31556952000,
    autoRemove: 'native',
})


app.use(session({
    name: "debatosour.sid",
    secret: "helloworld",
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        secure:true,
        maxAge: 31556952000,
        httpOnly: true,
        sameSite:"none"
    },
}))
// middlewares
app.use(passport.initialize())
app.use(passport.session());





require("./AllRoutes")(app)
app.listen(8000, () => console.log(`server started at port 8000`))
