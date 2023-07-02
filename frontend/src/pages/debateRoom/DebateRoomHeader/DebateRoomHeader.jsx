import { getTime, getTimeCountDown } from "../../../utils/services"

// import {} from "../../"

const DebateRoomHeader = ({debateState,isLive,activeDebateRef,gapCountDown ,speakTimeLeft,remainingTime}) => {
  return (
    <div>
           <div className="speak_time_debate_state">
        
          { 
(isLive &&  debateState?.isStarted  === false && debateState?.hasFinished === false ) && "Waiting for debators to start"
          }
          {
            isLive && debateState?.isPaused && "paused"
          }
          {
            (isLive && debateState?.isStarted && debateState?.hasFinished === false && debateState?.isPaused ===false ) && "Ongoing"
          }
          {
            (isLive && debateState?.hasFinished ) && "Completed"
          }
          {
            isLive === false && "Not Started"
          }
        </div>
               <div className='debate_room_top_header'>
          
            <h1 className='Debate_room_main_text' >
               {activeDebateRef.current?.topic}  </h1>
        
          {isLive &&
          <>
          
          {  (debateState?.isStarted && !debateState?.isInterval) && (<>
              
                <h1 className="main_timing_text">
                  {   `${ Boolean(getTime(speakTimeLeft)) ? `TIME LEFT  ${getTime(speakTimeLeft)}`:""}  `}
                </h1>
              
            </>
            )}

                {  (debateState.isStarted && debateState.isInterval) && (<>
              
                <h1 className="main_timing_text">
                  {   `${ Boolean(gapCountDown.sec) ? `INTERVAL FINISHES AFTER  ${gapCountDown.sec} sec`:""}  `}
                </h1>
              
            </>
            )}
          
          </>
          }
          {
              (isLive ===false && remainingTime.day !== null) ?    
              <h1 className="main_timing_text">
                 DEBATE STARTS IN {getTimeCountDown(null,remainingTime.day,remainingTime.hour,remainingTime.min,remainingTime.sec)}
              </h1>:""
          }
          
        </div>
        
    </div>
  )
}

export default DebateRoomHeader