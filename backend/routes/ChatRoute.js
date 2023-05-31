const { createChat, getChat, chatBot  } = require("../controller/ChatController");
const { handleRateUser } = require("../controller/UserController");

const router = require("express").Router()


router.post("/create",createChat)
router.get("/find",getChat);
router.post("/chatbot",chatBot ,handleRateUser)


module.exports = router