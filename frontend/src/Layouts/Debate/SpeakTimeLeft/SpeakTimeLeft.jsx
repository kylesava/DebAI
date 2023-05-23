import "./speakTimeLeft.css"
import {RiTimerFlashFill} from "react-icons/ri"
import {AiOutlineFieldNumber} from "react-icons/ai"
import {FiType} from "react-icons/fi"
import {TiGroup} from "react-icons/ti"
import { useSelector } from "react-redux"
const SpeakTimeLeft = ({debateState,countDown ,startTeam}) => {

  const {activeDebate ,isLive} = useSelector(state=>state.debate)
  
  return (
         <>
         {
   <div className='speak_time_left_box' >
    <div className="speakTime_left_box_time_show">
 
        <div className="speak_time_debate_state">
        
          { 
(isLive && !debateState?.isStarted && !debateState?.hasFinished) ? "Waiting for debators to start":


          debateState?.isPaused ? "Paused" :   debateState?.isStarted ? "Ongoing":
         debateState?.hasFinished ? "Completed":"Not Started"  
          }
        </div>
      </div>
      <div className="speak_time_info">

        <table>
          <thead style={{display:"none"}}>
            <th>hell</th>
            <th>loo</th>
          </thead>

      <tbody>
    
            {
              (!debateState?.isStarted && !debateState?.hasFinished) &&      <tr className="speakTime_item">
              <td className="speakTime_title">
              <TiGroup/>
              <p className="speak_time_key">Debate Start Team </p>
              </td> 
              <td className="speak_time_value">{startTeam}</td>
            </tr>
            }
            <tr className="speakTime_item" >
            <td className="speakTime_title">

            <FiType/>
            <p className="speak_time_key">Debate Type  </p>
            </td>
            
            <td className="speak_time_value">{activeDebate?.current?.type}</td>
          </tr>
            <tr className="speakTime_item" >
            <td className="speakTime_title">

            <AiOutlineFieldNumber/>
            <p className="speak_time_key">Total speech count  </p>
            </td>
            
            <td className="speak_time_value">{activeDebate?.current?.timeFormat?.length}</td>
          </tr>
          {
           ( debateState?.isStarted || debateState?.isPaused ) &&
            <tr className="speakTime_item" >
            <td className="speakTime_title">

            <RiTimerFlashFill/>
            <p className="speak_time_key">Active Speak Count   </p>
            </td>
            
            <td className="speak_time_value">{debateState?.round_shot}</td>
          </tr>
          }
      {

(debateState?.isStarted || debateState?.isPaused) &&    <tr className="speakTime_item">
            <td className="speakTime_title">
            <TiGroup />
            <p className="speak_time_key">Speech Team </p>
            </td> 
            <td className="speak_time_value">{debateState?.speakTeam}</td>
          </tr>
        } 
          {

          (debateState?.isStarted || debateState?.isPaused) &&  <tr className="speakTime_item" >
            <td className="speakTime_title">

            <RiTimerFlashFill/>
            <p className="speak_time_key">Time Left  </p>
            </td>
            
            <td className="speak_time_value">{countDown?.min} min &nbsp; {countDown?.sec} sec</td>
          </tr>
          }
      </tbody>
        </table>
          {/* <h1>
            {`Speech Time left ${countDown?.min !==null ? `${countDown?.min} min : ${countDown?.sec} sec`:""} for   ${debateState?.speakTeam} team`}
          </h1> */}
          </div>
    </div>
        
      }
        </>
  )
}

export default SpeakTimeLeft