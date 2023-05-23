const { createChat, getChat, chatBot } = require("../controller/ChatController")

const router = require("express").Router()


router.post("/create",createChat)
router.get("/find",getChat);
router.post("/chatbot",chatBot)


module.exports = router