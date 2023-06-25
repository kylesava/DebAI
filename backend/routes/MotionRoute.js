const { addMotionCategory, addMotion, getAllMotionCats, getAllMotionOfType, addComment, deleteComment, deleteCatMotion } = require("../controller/MotionController");

const router = require("express").Router()

router.post("/addcat",addMotionCategory)
router.post("/addmotion",addMotion)
router.get("/allcats",getAllMotionCats)
router.get("/alltypes",getAllMotionOfType)
router.post("/comment/:motionId",addComment)
router.delete("/comment/:_id/:comment_id",deleteComment)
router.delete("/cat/:id",deleteCatMotion)





module.exports = router ;