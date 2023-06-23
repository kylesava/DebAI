const MotionModel = require("../models/MotionModel");

class MotionController{


    async addMotionCategory(req,res){
        try {
                const motionCat = await MotionModel.create(req.body);
                return res.status(200).json({message:motionCat,success:true})
        } catch (error) {
                return  res.status(500).json({message:error.message,success:false})
        }
    }

    async addMotion(req,res){
        try {
                const motion = await MotionModel.create(req.body)
                res.status(200).json({message:motion,success:true})
        } catch (error) {
                res.status(500).json({message:error.message,success:false})
        }
    }

    async  getAllMotionOfType(req,res){
        const {typeId} = req.query


        try {
            const motions = await MotionModel.find({
                type:typeId
            }).populate("comments.userId");
            res.status(200).json({message:motions,success:true})
        } catch (error) {
            res.status(500).json({message: error.message,success:false})
        }
    }



}

module.exports = new MotionController()


