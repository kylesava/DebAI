const openAi = require("../index")
const ChatModel = require("../models/ChatModel")
const DebateModel = require("../models/DebateModel")
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


    async chatBot(req,res){
        const {debateId} = req.query
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
        if( debateId !=="undefined"){

            await DebateModel.findByIdAndUpdate(debateId,{
                $set:{
                    transcript :response.data?.choices[0].text,
                    hasEnded:true
                }
            })
        }
        return res.status(200).json({ message: response.data?.choices[0].text, uid:Date.now() , success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, success: false })
    }

    }

}

module.exports = new ChatController()