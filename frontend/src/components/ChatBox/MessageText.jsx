
import { useState } from "react"
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useSpeechSynthesis } from "react-speech-kit";
import moment from  "moment"
import "./MessageText.css"

const MessageText = ({ message, own ,chatBot }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { speak, speaking, cancel } = useSpeechSynthesis();

  const handleSpeak = (typee) => {

    if (speaking) {
      cancel()
      return;
    };
    speak({ text: typee })
  }





  return (
    <div className="messageTextWrapper" onMouseLeave={() => setIsHovered(false)} onMouseOver={() => setIsHovered(true)} style={{  flexDirection: own ? "row-reverse" : "row" }}>
      <div className="user_emoji">

   
   {

   message?.owner ==="bot" ? "🤖" : <img className="user_image" referrerPolicy="no-referrer" src={ message?.owner?.avatar} alt="userImg" /> 

    }

    


      </div>
      <div className="message_content">
          {

            isHovered &&<> <span className="message_time">{moment(message?.createdAt).format('LT')}</span>
            <div className={`hover_options ${own ? "myoption" : "otheroption"}`}>
              <HiOutlineSpeakerWave onClick={() => handleSpeak(message?.text)} className={`speakerIcon ${speaking ? "isspeaking" : ""}`} />
            </div>
</>
            } 
        <p className={`message_text_content ${own ? "my_text_content" : ""}`}>
        
            { message?.text}
        </p>

      </div>
    </div>
  )
}

export default MessageText