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
  const [ completionStep,setCompletionStep ] =useState("")
  const {data:currentUser} =useSelector(state=>state.user)
  const [activeDebate,setActiveDebate] = useState(null)
  const handleNext =()=>setCompletionStep("translate")
  const [debateResult,setDebateResult] =useState("")
  const {debateId} = useParams();  

  useEffect(()=>{
    if(!debateId)return;
    fetchDebateById()
  },[debateId])
 
  useEffect(()=>{
    if(activeDebate && currentUser){
      
      const {winner,teams,judgeType} = activeDebate;
     
      setCompletionStep( judgeType ===Enums.AIJUDGE ? Enums.TRANSCRIPT_TAB :Enums.MYSTERY_TAB)
      const myTeamName  =     getMyTeam(teams,currentUser?._id).name; 
      if(myTeamName===winner){
      setDebateResult(Enums.WON)
    }else if(Enums.MATCH_TIED === winner){
      setDebateResult(Enums.TIED)
    }else{
      setDebateResult(Enums.LOSE)
    }
    }
  },[activeDebate,currentUser]);



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
     <img src="https://img.freepik.com/premium-photo/cartoon-slot-machine-with-money-illustration-casino-games_863013-8080.jpg?w=740" alt="winner image"  className={styles.main_bg_image} />
    <div className={styles.modalBodyContent}
    >
          {
           completionStep &&  completionStep === Enums.MYSTERY_TAB ? <MysteryBox debateResult={debateResult} activeDebate={activeDebate} handleNext={handleNext}/> :        <Transcript activeDebate={activeDebate}/>
          }
    </div>
    </div>
  )
}

export default DebateCompletionUi