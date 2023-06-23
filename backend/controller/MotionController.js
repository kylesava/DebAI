const MotionCatModel = require("../models/MotionCatModel");
const MotionModel = require("../models/MotionModel");

class MotionController{


    async addMotionCategory(req,res){
        try {
                const motionCat = await MotionCatModel.create(req.body);
                return res.status(200).json({message:motionCat,success:true})
        } catch (error) {
                return  res.status(500).json({message:error.message,success:false})
        }
    }

    async addMotion(req,res){
        try {
                let motion = await MotionModel.create(req.body)
                motion = await motion.populate({

                path:"comments.userId",
                select:"-password"
            })


                res.status(200).json({message:motion,success:true})
        } catch (error) {
                res.status(500).json({message:error.message,success:false})
        }
    }

        async getAllMotionCats(req,res){
            try {
                    const motionsCat = await MotionCatModel.find({})
                    return res.status(200).json({message:motionsCat,success:true})
            } catch (error) {
                return res.status(500).json({message:error.message,success:false})
            }
        }
    async  getAllMotionOfType(req,res){
        const {typeId} = req.query


        try {
            const motions = await MotionModel.find({
                type:typeId
            }).populate({
                path:"comments.userId",
                select:{
                    "password":0
                }
            });
            res.status(200).json({message:motions,success:true})
        } catch (error) {
            res.status(500).json({message: error.message,success:false})
        }
    }


async addComment(req,res){
const { motionId } = req.params
        const { comment, userId } = req.body


        try {
            
            const updated = await MotionModel.findOneAndUpdate({
                _id:motionId 
            },
            {
                $push:{comments:{userId,comment}}
            },
            {
                new:true,
                returnOriginal:false
            }).populate({
                path:"comments.userId",
                select:"-password"
            })
            

            return res.status(200).json({ message: updated, success: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })

        }

}

async deleteComment(req,res){
const {_id,comment_id} = req.params
console.log(_id,comment_id)
try {
   const  updated =   await MotionModel.findOneAndUpdate(
          { _id },
  { $pull: { comments: { _id: comment_id } } },
  { new: true },

     )

     res.status(200).json({message:updated,success:true})
} catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
}
}
}

module.exports = new MotionController()


