import "./debateFormatBox.css"
import {TiGroup} from "react-icons/ti"
import {RiTimerFlashFill} from "react-icons/ri"
import {CgMenuMotion} from "react-icons/cg"
import { useEffect, useState } from "react"
import { TimeFormatMappingMethod } from "../../../utils/data"
import TeamFormatTable from "../../../Layouts/Table/TeamFormatTable/TeamFormatTable"
const DebateFormat = ({ teams ,debateForm ,setDebateForm}) => {

  const [startBy,setStartBy] =useState("");
  const [teamArr,setTeamArr] =useState([])


    useEffect(()=>{
      const teamsNameArr = teams.map(team=>team.name);
      setTeamArr(teamsNameArr)
      if(teamsNameArr.length === 2 && teamsNameArr[0] !== "" && teamsNameArr[1]!=="" && debateForm.type){
       let data=    TimeFormatMappingMethod(  teamsNameArr, debateForm.type)


            setDebateForm((prev)=>{
              return {...prev, timeFormat:data }
            })
      }
    },[teams,debateForm.type]);

    useEffect(()=>{
      if(!startBy)return;
 
      setDebateForm((prev)=>({
        ...prev, 
        timeFormat:handleSpeakOrder(startBy)
      }))
    },[startBy])

   const handleSpeakTimeChange=(event,changedIndex)=>{
    const {timeFormat} = debateForm
    const changedData =  timeFormat.map((format,index )=>{
              if(index === changedIndex){
                return {...format,time:parseInt(event.target.value) }
              }else{
                return format
              }
            })
              console.log(changedData,"changed")
            setDebateForm((prev)=>({

              ...prev, timeFormat:changedData
            }))
       

        }


    

    const getNextTeam=(theTeam)=>{
     
      return teamArr.find(team =>team !== theTeam)
  }
  
  const handleSpeakOrder=(team)=>{
    console.log('inside')
    const {timeFormat} = debateForm
    if(timeFormat[0].team === team){
        return timeFormat;
    };
    let barrier = 0;
    return timeFormat.map((format_item,index)=>{
        if(format_item.team === "both"){
        ++barrier;
        return format_item
        }
        if((index + barrier) % 2 ===0){
            return {...format_item  ,team  }
        }else{
              return {  ...format_item ,team :getNextTeam(team)}
        }
    })
}


  return (
    <>
    <div className="debate_create_header_top">
    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/save-as.png" alt="save-as"/>
    <h1 className='team_form_header'> <h1>DEBATE</h1> FORMAT</h1>
    </div>
    {
      (debateForm?.timeFormat && teamArr[0] && teamArr[1]) &&
    <TeamFormatTable  handleSpeakTimeChange={handleSpeakTimeChange} debateForm={debateForm}/>
    }
    </>

)}


export default DebateFormat



