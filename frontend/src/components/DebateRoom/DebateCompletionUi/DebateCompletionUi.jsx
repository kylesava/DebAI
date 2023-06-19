import styles from "./DebateCompletionUi.module.css"
import Transcript from "../Transcript/Transcript"
import { useEffect, useState } from "react"
import MysteryBox from "../MysteryBox/MysteryBox"
import { useParams } from "react-router-dom"
import { getDebateByIdApi } from "../../../utils/Api"
import { useSelector } from "react-redux"
import { getMyTeam } from "../../../utils/services"
import { Enums } from "../../../redux/action/actionTypes/Enumss"


const DebateCompletionUi = () => {
  const [ completionStep,setCompletionStep ] =useState(Enums.MYSTERY_TAB)
  const {data:currentUser} =useSelector(state=>state.user)
  const [activeDebate,setActiveDebate] = useState(null)
  const handleNext =(type)=>setCompletionStep(type)
  const [debateResult,setDebateResult] =useState("")
  const [isAudience,setIsAudience] =  useState(true)
  const {debateId} = useParams();  
  const [isParticipants,setisparticipants]=useState(false)

  useEffect(()=>{
    if(!debateId)return;
    fetchDebateById()
  },[debateId])
 

  useEffect(()=>{
    if(activeDebate ){
      const {winner,teams} = activeDebate;
      const myTeamName  =     getMyTeam(teams,currentUser?._id)?.name; 
      if(!myTeamName){
        setDebateResult("AUDIENCE")
        
        return setisparticipants(false)

      }else{
        setIsAudience(false)
      }
      if(myTeamName.toLowerCase()===winner.toLowerCase()){
      setDebateResult(Enums.WON)
    }else if(Enums.MATCH_TIED === winner){
      setDebateResult(Enums.TIED)
    }else{
      setDebateResult(Enums.LOSE)
    }
    }
  },[activeDebate,currentUser]);

console.log(debateResult)

  const fetchDebateById=async()=>{
    try {
      const {data,status} = await getDebateByIdApi(debateId)
      if(status ===200){  
        setActiveDebate(data.message[0])
      }
    } catch (error) {
      
    }
  }
  return (
    <div 
    className={styles.finishModalContainer}>

    
    <div className={styles.modalBodyContent}
    >
          {
           completionStep &&  completionStep === Enums.MYSTERY_TAB ?
            <MysteryBox 
            debateResult={debateResult}
            activeDebate={activeDebate}
            isAudience={isAudience}
            handleNext={handleNext}/> :      
            <Transcript
            activeDebate={activeDebate}
            handleNext={handleNext}/> 
          }
    </div>
    </div>
  )
}

export default DebateCompletionUi