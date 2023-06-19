import "./debateFormatBox.css"

import TeamFormatTable from "../../../Layouts/Table/TeamFormatTable/TeamFormatTable"
import { useEffect } from "react"
import { TimeFormatMappingMethod } from "../../../utils/data"
const DebateFormat = ({ teams, debateForm ,setDebateForm}) => {


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


      useEffect(()=>{
        const teamsNameArr = teams.map(team=>team.name);

        if(teamsNameArr.length === 2 && teamsNameArr[0] !== "" && teamsNameArr[1]!=="" && debateForm.type){
         let data=    TimeFormatMappingMethod(  teamsNameArr, debateForm.type)
  
  
              setDebateForm((prev)=>{
                return {...prev, timeFormat:data }
              })
        }
      },[teams,debateForm.type]);

  return (
    <>
    <div className="debate_create_header_top">
    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/save-as.png" alt="save-as"/>
    <h1 className='team_form_header'> <h1>DEBATE</h1> FORMAT</h1>
    </div>
    {


      debateForm?.timeFormat &&
      
      <TeamFormatTable  handleSpeakTimeChange={handleSpeakTimeChange} debateForm={debateForm}/>
    }
    </>

)}


export default DebateFormat



