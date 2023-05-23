import React, { useState, useEffect } from 'react'
import "./MessageInput.css"
import { BsFillSendFill } from "react-icons/bs"
import { MdKeyboardVoice } from 'react-icons/md';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useSelector } from 'react-redux';
import LoginToChat from '../../../Layouts/FirstLoginToChat/LoginToChat';

const MessageInput = ({ isLiveChat, handleSendMessage }) => {

  const {data:userData} =useSelector(state=>state.user)
  const [voiceText, setVoiceText] = useState("");
  const {
    transcript,
    listening,
  } = useSpeechRecognition();


  useEffect(() => {
    setVoiceText(transcript)

  }, [transcript]);


  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      handleSendMessage(voiceText,removeInput)
    }
    
  }
  const handleInputChange = (event) => {
    setVoiceText(event.target.value);

  }

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true })
    }
  }
  
  const removeInput=()=>setVoiceText("")
  return (
    <div className='MessageInputWrapper'  >

      {
        !userData ? <LoginToChat/> : <>
        
        <MdKeyboardVoice
       className={`voiceText ${listening ? "active_speaking" : ""}`} 
       onClick={handleListen} />

      <input 

    onKeyDown={handleKeyDown}
      className='message_input' 
      type="text" 
      placeholder={` ${!isLiveChat ? "Ask anything to Debatasour chatbot..." : "Say something in live chat..."}`} onChange={handleInputChange}
       value={voiceText}
        />

      <div
      className='sent_message_box' 
      onClick={()=>handleSendMessage(voiceText,removeInput)}
      >

        <BsFillSendFill />
      </div>
        
        </>
      }

    
    </div>
  )
}

export default MessageInput