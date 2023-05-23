import { useState } from "react"
import MessageInput from "../../components/ChatBox/MessageInput/MessageInput"
import MessageText from "../../components/ChatBox/MessageText"
import Sidebar from "../../Layouts/ChatAI/Sidebar/Sidebar"
import Navbar from "../../Layouts/Navbar/Navbar"
import { chatBotApi } from "../../utils/Api"
import "./ChatBot.css"
import { useSelector } from "react-redux"
import ChatBotStarter from "../../components/ChatBot/starter/ChatBotStarter"

const ChatBot = () => {

  const [chatbotMsgArr,setChatBotMsgArr] =useState([])
  const {data} = useSelector(state=>state.user)
  const [loading,setLoading]=useState(false)



  const writeMessage =(message)=>{

    const {_id,text} = message;

    let i = 0;
     const timer = setInterval(() => {
      const nextText = text[i]  

      
      setChatBotMsgArr((prev)=>{
        



        if(prev.findIndex((msg)=>msg._id === _id) === -1){

          return [...prev, {
            ...message,
            text:nextText
          }]
        }else{
       return prev.map(msg=>{
            if(msg._id===_id){
              return {
                ...msg , text:msg.text + nextText
              }
            }else{
              return msg
            }
          })
        }






      })

      i++;

      if(i === text.length){
        clearInterval(timer )
      }
    }, 10);
      




  }

 

  const getChatBotMessage = async (prompt,cb) => {

    let newMessage ={
      owner:data,
      text:prompt,
      own:true,
      _id:Date.now()
    }
    setChatBotMsgArr((prev)=>([
      ...prev,newMessage
    ]))

    try {
      setLoading(true)
      cb()  ;
        const ress = await chatBotApi(prompt);
        if(ress.status===200){
          const {message} = ress.data
          let resmsg = {
            own:false,
            text:message,
            owner:"bot",
            _id:Date.now()+100
          }
          setLoading(false)
          writeMessage(resmsg)
        }
    
 
    } catch (error) {
      setLoading(false)
    }
  }




  return (

    <>
      <Navbar />
      <div className="ChatbotWrapper">

        {/* <Sidebar /> */}


        <div className="chat_bot_message_play_ground">
          <div className="chat_box_message">

        {
          chatbotMsgArr.length > 0 ? chatbotMsgArr.map(msg=>(
            <MessageText 
                key={msg?._id}
              message={msg}
              own={msg.own}
            />
          )): <ChatBotStarter/>
        }

          </div>
   

                  <MessageInput    handleSendMessage={getChatBotMessage}  handleSubmit={getChatBotMessage} />
        </div>
      </div>
    </>
  )
}

export default ChatBot