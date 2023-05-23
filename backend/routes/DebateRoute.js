const { createDebate, getDebate, updateDebate, getSingleDebate, deleteDebate  ,removeParticipant,joinedParticipant, usersDebateCounts, voteTeam, voteAndUnVote, unVoteTeam, checkIfPasscodeIsUnique, getDebateOfUser, addAvatarEquipedMembersInDebate } = require("../controller/DebateController")
const router = require("express").Router()

router.post("/vote",voteTeam)
router.post("/unvote",unVoteTeam)
router.post("/voteAndUnvote",voteAndUnVote)
router.post("/", createDebate)
router.get("/", getDebate)
router.get("/:userId", getDebateOfUser)
router.get("/singleDebate/:debateId", getSingleDebate)
router.get("/counts/:userId", usersDebateCounts)
router.put("/:debateId", updateDebate)
router.delete("/:debateId", deleteDebate)
router.post("/joinParticipant/:debateId",joinedParticipant)
router.post("/checkPasscode",checkIfPasscodeIsUnique)
router.post("/removeParticipant/:debateId",removeParticipant);
router.put("/addAvatarEquipedMembersInDebate/:debateId/:userId",addAvatarEquipedMembersInDebate)


module.exports = router 