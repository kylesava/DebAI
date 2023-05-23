const DebateModel = require("../models/DebateModel");
const { hasVoted } = require("../services/UtilityMethods");
const ObjectId = require("mongoose").Types.ObjectId;

class DebateController {
  async createDebate(req, res) {
    try {
      const savedDebate = await DebateModel.create(req.body);
      res.status(200).json({ message: savedDebate, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
  async getDebate(req, res) {
    let searchQuery = {};
    Object.keys(req.query).forEach((key) => {
      if (req.query[key]) {
        searchQuery[key] = req.query[key];
      }
    });
    let fetchedDebate = null;
    try {
      if (req.query.live) {
        fetchedDebate = await DebateModel.find({
          $and: [
            { startTime: { $lt: new Date() } },
            {hasEnded:false}
          ],
        }).populate(["admin", "teams.members", "joinedParticipants"]);
      } else if (req.query.upcoming) {
        fetchedDebate = await DebateModel.find({
          startTime: { $gt: new Date() },
          hasEnded:false
        })
          .populate(["admin", "teams.members", "joinedParticipants"])
          .sort({ startTime: 1 });
      } else {
        fetchedDebate = await DebateModel.find({
          ...searchQuery
         
        })
          .populate(["admin", "teams.members", "joinedParticipants"])
          .sort({ startTime: 1 });
      }
      res.status(200).json({ message: fetchedDebate, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async updateDebate(req, res) {
    const { debateId } = req.params;
    if (!debateId) throw Error("debateId is required");
    try {
      const updatedDebate = await DebateModel.findByIdAndUpdate(
        debateId,
        {
          $set: req.body,
        },
        {
          new: true,
          returnOriginal: false,
        }
      );
      res.status(200).json({ message: updatedDebate, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, sucess: false });
    }
  }

  async deleteDebate(req, res) {
    const { debateId } = req.params;
    try {
      await DebateModel.findByIdAndDelete(debateId);
      res.status(200).json({ message: "successfully deleted", success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong", success: false });
    }
  }
  async usersDebateCounts(req, res) {
    const { userId } = req.params;

    try {
      const upcomingDebate = await DebateModel.find({
        admin: userId,
        startTime: { $gt: new Date() },
      }).count();
      const liveDebate = await DebateModel.find({
        admin: userId,
        $and: [
          { startTime: { $lt: new Date() } },
          { endTime: { $gt: new Date() } },
        ],
      }).count();
      res
        .status(200)
        .json({ message: { upcomingDebate, liveDebate }, success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error, success: false });
    }
  }
  async joinedParticipant(req, res) {
    const { debateId } = req.params;
    const { participantId } = req.body;
    try {
      if (!debateId || !participantId) {
        throw Error("fill all the fields");
      }

      const debate = await DebateModel.findById(debateId);
      console.log(debate.joinedParticipants);
      if (debate.joinedParticipants.includes(participantId)) {
        throw Error("User is already joined");
      }
      await DebateModel.findByIdAndUpdate(debateId, {
        $push: {
          joinedParticipants: participantId,
        },
      });
      res
        .status(200)
        .json({ message: "successfully added the participant", success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "failed to add the participant", success: false });
    }
  }
  async removeParticipant(req, res) {
    const { debateId } = req.params;
    const { participantId } = req.body;
    try {
      if (!debateId || !participantId) {
        throw Error("fill all the fields");
      }
      await DebateModel.findByIdAndUpdate(debateId, {
        $pull: {
          joinedParticipants: participantId,
        },
      });
      res.status(200).json({
        message: "successfully removed the participant",
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "failed to remove the participant", success: false });
    }
  }

  async getSingleDebate(req, res) {
    try {
      const { debateId } = req.params;
      let isEnded = false;
      if (!ObjectId.isValid(debateId)) {
        return res
          .status(401)
          .json({ message: "Invalid link", success: false });
      }
      if (!debateId) throw Error("invalid credentails");
      const singleDebate = await DebateModel.findById(debateId).populate([
        "admin",
        "teams.members",
        "joinedParticipants",
      ]);
      console.log(singleDebate);
      if (Date.now() >= singleDebate?.endTime) {
        isEnded = true;
      }
      return res
        .status(200)
        .json({ message: { debate: singleDebate, isEnded }, success: true });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.message, success: false });
    }
  }

  async voteTeam(req, res) {
    const { debate, team, user } = req.body;
    try {
      if (!debate || !team || !user) {
        throw Error("invalid credentails");
      }

      const updated = await DebateModel.findByIdAndUpdate(
        debate,
        {
          $push: {
            "teams.$[element].vote": user,
          },
        },
        {
          arrayFilters: [{ "element.name": team }],
          returnOriginal: false,
          returnDocument: true,
        }
      ).populate(["admin", "teams.members", "joinedParticipants"]);
      res.status(200).json({ message: updated, success: true });
    } catch (error) {
      console.log(error);
      res.json(500).json({ message: error.message, success: false });
    }
  }

  async unVoteTeam(req, res) {
    const { debate, team, user } = req.body;
    try {
      const unVoted = await DebateModel.findByIdAndUpdate(
        debate,
        {
          $pull: {
            "teams.$[element].vote": user,
          },
        },
        {
          arrayFilters: [{ "element.name": team }],
          returnOriginal: false,
          returnDocument: true,
        }
      ).populate(["admin", "teams.members", "joinedParticipants"]);
      res.status(200).json({ message: unVoted, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async voteAndUnVote(req, res) {
    try {
      const { voteTeam, unVoteTeam, user, debate } = req.body;
      await DebateModel.findByIdAndUpdate(
        debate,
        {
          $push: {
            "teams.$[element].vote": user,
          },
        },
        {
          arrayFilters: [{ "element.name": voteTeam }],
          returnOriginal: false,
        }
      );
      const updated = await DebateModel.findByIdAndUpdate(
        debate,
        {
          $pull: {
            "teams.$[element].vote": user,
          },
        },
        {
          arrayFilters: [{ "element.name": unVoteTeam }],
          returnOriginal: false,
          returnDocument: true,
        }
      ).populate(["admin", "teams.members", "joinedParticipants"]);

      return res.status(200).json({ message: updated, success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  }

  async checkIfPasscodeIsUnique(req, res) {
    const { passcode } = req.body;

    try {
      const debate = await DebateModel.find({
        passcode,
        hasEnded: false,
      });
      if (debate.length) {
        res.status(200).json({
          message: {
            isUnique: false,
          },
        });
      } else {
        res.status(200).json({
          message: {
            isUnique: true,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async getDebateOfUser(req, res) {
    let { future, invitation } = req.query;
    const { userId: admin } = req.params;
    let debatesData;
    try {
      if (invitation === "true") {
        debatesData = await DebateModel.aggregate([
          {
            $match: {
              "teams.members": {
                $elemMatch: {
                  $eq: ObjectId(admin),
                },
              },
              admin: {
                $ne: ObjectId(admin),
              },
            },
          },
          {
            $lookup: {
              from: "users", // replace with the name of your users collection
              localField: "admin",
              foreignField: "_id",
              as: "admin_info",
            },
          },
          {
            $unwind: "$admin_info",
          },
          {
            $addFields: {
              firstName: "$admin_info.firstName",
              lastName: "$admin_info.lastName",
            },
          },
          {
            $project: {
              admin_info: 0,
            },
          },
        ]);
      } else if (future === "true") {
        debatesData = await DebateModel.find({
          hasEnded: false,
          admin,
        });
      } else {
        debatesData = await DebateModel.find({
          hasEnded: true,
          admin,
        });
      }
      res.status(200).json({ message: debatesData, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }


  async addAvatarEquipedMembersInDebate(req,res){
    const {debateId,userId}= req.params;
    try {
         await DebateModel.findByIdAndUpdate(debateId,{
          $push:{
            avatarEquipedMembers:userId
          }
        });
        
      res.status(200).json({message:"successfully added ",success:true})
    } catch (error) {
      res.status(500).json({message:error.message,success:false})
    }
  }




}





module.exports = new DebateController();
