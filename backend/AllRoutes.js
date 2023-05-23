module.exports = (app) => {
    app.use("/api/user", require("./routes/UserRoute"))
    app.use("/api/auth", require("./routes/AuthRoute"))
    app.use("/api/debate", require("./routes/DebateRoute"));
    app.use("/api/chat", require("./routes/ChatRoute"));
}