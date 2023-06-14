import "./speakTimeLeft.css"
import { useSelector } from "react-redux"
const SpeakTimeLeft = ({debateState,countDown ,startTeam}) => {

  const {activeDebate ,isLive} = useSelector(state=>state.debate)
  
  return (
         <>
         {
   <div className='speak_time_left_box' >
    <div className="speakTime_left_box_time_show">
 

      </div>
      <div className="speak_time_info">

   


         <div className="speakTime_item" >
            <div className="speakTime_title">

<img width="96" height="96" src="https://img.icons8.com/fluency/96/diversity.png" alt="diversity"/>            
            <p className="speak_time_key">Debate Type  </p>
            </div>
            
            <p className="speak_time_value">{activeDebate?.current?.type}</p>
       
          </div>       
        <div className="speakTime_item" >
            <div className="speakTime_title">

         <img width="48" height="48" src="https://img.icons8.com/fluency/48/expired.png" alt="expired"/>
            <p className="speak_time_key">Total speech   </p>
            </div>
            
            <p className="speak_time_value">{activeDebate?.current?.timeFormat?.length}</p>
      
          </div>
    
            
{/*                
                    <div className="speakTime_item" >
            <div className="speakTime_title">

         <img width="48" height="48" src="https://img.icons8.com/fluency/48/expired.png" alt="expired"/>
            <p className="speak_time_key">Total speech   </p>
            </div>
            
            <p className="speak_time_value">{activeDebate?.current?.timeFormat?.length}</p>
      
          </div>    */}
           <div className="speakTime_item">
              <div className="speakTime_title">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/user-group-man-woman--v1.png" alt="user-group-man-woman--v1"/>
              <p className="speak_time_key">Start Team </p>
              </div> 
              <p className="speak_time_value">{startTeam}</p>
            </div>
            
          
      




          
          
          
   


                {
           ( debateState?.isStarted || debateState?.isPaused ) &&
            <div className="speakTime_item" >
            <div className="speakTime_title">

            <img width="66" height="66" src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-Mic-party-and-celebrations-smashingstocks-outline-color-smashing-stocks-2.png" alt="external-Mic-party-and-celebrations-smashingstocks-outline-color-smashing-stocks-2"/>
            <p className="speak_time_key">Active Speech   </p>
            </div>
            <p className="speak_time_value">{debateState?.round_shot}</p>
          </div>
          
          }            

               <div className="speakTime_item" >
            <div className="speakTime_title">

            <img width="64" height="64" src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-judge-auction-flatart-icons-flat-flatarticons-1.png" alt="external-judge-auction-flatart-icons-flat-flatarticons-1"/>
            <p className="speak_time_key">Judge Type  </p>
            </div>
            
            <p className="speak_time_value">{activeDebate?.current?.judgeType}</p>
          </div>
      
       




      {

 debateState?.isStarted && <>

  

          <div className="speakTime_item">
               <div className="speakTime_title">
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/talk-male--v2.png" alt="talk-male--v2"/> 
            <p className="speak_time_key">Speech Team </p>
            </div> 
            <p className="speak_time_value">{debateState?.speakTeam}</p>
            </div>
        </>
        } 
    
    
     
          </div>
    </div>
        
      }
        </>
  )
}

export default SpeakTimeLeft