const DebateModel = require("../models/DebateModel");

async function endTheDebateAfterTwoDays(){
    try {
      const todayTime = new Date().getTime(); 
      const pipeline = [
        {
          $addFields:{
            endTime:{
              $add:["$startTime",2*24*60*60*1000]
            }
          }
        },
        {
          $addFields:{
            hasEnded:{$lt:["$endTime",todayTime]}
          }
        }
      ]

      const updateResult =  await DebateModel.updateMany({},pipeline);
      console.log(`${updateResult.modifiedCount} debates updated`)

    } catch (error) {
        console.log(`auto script err: ${error.message}`)
    }
  }


module.exports  = {
  endTheDebateAfterTwoDays
}