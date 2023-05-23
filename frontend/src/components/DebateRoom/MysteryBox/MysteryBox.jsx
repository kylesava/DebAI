
import styles from "./MysteryBox.module.css"
import ClaimReward from "../ClaimReward/ClaimReward"
import {BiUpvote,BiDownvote, BiArrowBack} from "react-icons/bi"
import {GrFormNextLink} from "react-icons/gr"
import {motion} from "framer-motion"
import { useEffect, useState } from "react"
import { getNameAndVoteOfTeams } from "../../../utils/services"
import { Enums } from "../../../redux/action/actionTypes/Enumss"
import { useNavigate } from "react-router-dom"


const MysteryBox = ({handleNext ,debateResult ,activeDebate}) => {

  const [ bothTeams,setBothTeams] = useState([]);
  const [goToNext,setGoToNext] =useState(false)
  const [judgeType,setJudgeType] =useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    if(!activeDebate)return;
    const {judgeType:type} = activeDebate;
    setJudgeType(type)
   setBothTeams(getNameAndVoteOfTeams(activeDebate.teams))

  },[activeDebate])


  const getResultText=()=>{
    if(debateResult===Enums.WON){
     return  `Your team won the debate`
    }else if(debateResult===Enums.LOSE){
       return  `Your team lose the debate`
    }else{
     return `Debate Tied`
    }
  }
  return (
    <>
    <motion.div
      initial={
        {
          x:"-100px",
          scale:0.9,
          opacity:0.5
        }
      }
      animate={
        {
          x:"0px",
          scale:1,
          opacity:1
        }
      }
      
      transition={{ duration: 0.5 ,bounce:200 }}
      className={styles.modelContent}
    >

    <div className={styles.top_winning_team}>
        <img  className={styles.win_logo} width="40" height="40" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Win-casino-smashingstocks-flat-smashing-stocks.png" alt="external-Win-casino-smashingstocks-flat-smashing-stocks"/>
        <h1 className={styles.winning_team_text}> {getResultText()}</h1> 
        </div>
        <div className={styles.vote_count_box}>
          {

            bothTeams.map((team,index)=>(
              <>
            <div key={index} className={`${styles.vote_button_count } ${ index===0 && styles.winning_team_vote}`}   >
              {
                index ===0 ?<BiUpvote/> :<BiDownvote/>
              }  
                <p>
                {team.vote }  
                {team.name}  
                </p>
             </div>
            </>
      ))
      }
        </div>
        <ClaimReward activeDebate={activeDebate} setGoToNext={setGoToNext} debateResult={debateResult}/>
       {
         ( judgeType===Enums.AIJUDGE &&  goToNext) && <button className={styles.nextButton} onClick={handleNext}>
          <GrFormNextLink className={styles.nextIcon}/>
          Next
        </button>
        }
        {
          ( judgeType !==Enums.AIJUDGE && goToNext) && <button className={styles.nextButton} onClick={()=>navigate("/")}>
          <BiArrowBack className={styles.nextIcon}/>
        BACK
        </button>

        }
    </motion.div>
    
    </>
  )
}

export default MysteryBox