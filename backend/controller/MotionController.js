const MotionCatModel = require("../models/MotionCatModel");
const MotionModel = require("../models/MotionModel");
const fs = require('fs');
const readline = require('readline');

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
        const {typeId,group} = req.query



        try {
            const motions = await MotionModel.find({
                type:typeId,
                group
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

async deleteCatMotion(req,res){
    const {id} = req.params;
    try {
            await MotionCatModel.findByIdAndDelete(id)
            return res.status(200).json({message:"successfully deleted",success:true})
    } catch (error) {
            return res.status(500).json({message:error.message,success:false })
    }
}
async addBulkMotion(req,res){
      const topics = [];
      const {type,group} = req.body;
      console.log(type,group)
      if(!req.file){
        res.status(403).json({message:"provide txt file",success:false})
      }
  const rl = readline.createInterface({
    input: fs.createReadStream(req.file.path),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    topics.push({ topic: line ,type,group });
});

rl.on('close', async () => {
    try {
        
        console.log(topics)
     console.log("uploading in db")
       await MotionModel.insertMany(topics);
      res.json({ message: 'Topics added successfully' });   
    } catch (err) {
      console.error('Error adding topics to the database:', err);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
    console.log("deleting file")
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
  });
}
}

module.exports = new MotionController()


