const openAi = require("../index")
const ChatModel = require("../models/ChatModel")
const DebateModel = require("../models/DebateModel")
const UserModel = require("../models/UserModel")
const { getOpenAiResponse } = require("../services/UtilityMethods")
class ChatController{

    async createChat(req,res){

        try {
                 let  createdChat = await ChatModel.create(req.body)
                createdChat =   await createdChat.populate(["owner","debate"])
                res.status(200).json({message:createdChat,success:true})
        } catch (error) {
            res.status(500).json({message:error.message,success:false})
        }

    }

    async getChat(req,res){
        const {debate}   = req.query

        try {
                const searchedChat = await ChatModel.find({
                    debate 
                }).sort({"createdAt":1}).populate(["debate","owner"]);
                res.status(200).json({message:searchedChat,success:true})
        } catch (error) {
            res.status(500).json({message:error.message,success:true})
        }
    }


    async chatBot(req,res,next){
        const {debateId} = req.query;
        const {teams} =  req.body;
        try {
            const prompt = req.body.prompt
            const response = await openAi.createCompletion({
                model: "text-davinci-003",
                prompt,
                temperature: 0.5,
                max_tokens:512,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0,
            
        })

            
            if(debateId !=="undefined"){
            
            let text = response.data?.choices[0].text;
            let textARr = text.split(" ")
            let lastLine = textARr.splice(-60);
            lastLine = lastLine.join(" ");
            let prompt = `give one word answer .  Give the name of the winner from the following text : ${lastLine}`
            let winner  =  await  getOpenAiResponse(prompt)
            winner =  winner.replace(/\n\n/g, '');
            console.log(winner,lastLine)
            const winnerTeam = teams.filter(team=>team.name.toLowerCase()===winner.toLowerCase()).flatMap(team=>team.members.map(mem=>mem._id));
            const loserTeam = teams.filter(team=>team.name.toLowerCase() !==winner.toLowerCase()).flatMap(team=>team.members.map(mem=>mem._id));

            

            req.body.winnerTeam = winnerTeam;
            req.body.loserTeam = loserTeam
            req.body.winner = winner;

            await DebateModel.findByIdAndUpdate(debateId,{
                hasEnded:true,
                winner:winner,
                transcript:response.data?.choices[0].text,
            })
            console.log("line",lastLine)
            console.log("winner",winner)
            // console.log(winnerTeam,loserTeam,winner,req.body)
            next()

            }else{

                
                
                return res.status(200).json({message:response.data?.choices[0].text,success:true})
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, success: false })
    }

    }

}

module.exports = new ChatController()


