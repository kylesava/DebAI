const router = require("express").Router()
const multer =  require("multer")
const upload =  multer({dest:"uploads/"});

const { addMotionCategory, addMotion, getAllMotionCats, getAllMotionOfType, addComment, deleteComment, deleteCatMotion, addBulkMotion } = require("../controller/MotionController");

router.post("/file", upload.single("debateTopics") , addBulkMotion)
router.post("/addcat",addMotionCategory)
router.post("/addmotion",addMotion)
router.get("/allcats",getAllMotionCats)
router.get("/alltypes",getAllMotionOfType)
router.post("/comment/:motionId",addComment)
router.delete("/comment/:_id/:comment_id",deleteComment)
router.delete("/cat/:id",deleteCatMotion)





module.exports = router ;