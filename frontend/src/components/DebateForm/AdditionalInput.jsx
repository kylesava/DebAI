import React from 'react'
import { MdFreeBreakfast } from 'react-icons/md';
import { useEffect, useState } from "react"
import {RiTeamLine} from "react-icons/ri"
import "./DebateFormInput.css"
const AdditionalInput = ({debateForm,setDebateForm,teams}) => {
  
  const [startBy,setStartBy] =useState("");
  const [teamArr,setTeamArr] =useState([])
  
  
  
      useEffect(()=>{
        if(!startBy)return;
   
        setDebateForm((prev)=>({
          ...prev, 
          timeFormat:handleSpeakOrder(startBy)
        }))
      },[startBy])


      useEffect(()=>{
        
        const teamsNameArr = teams.map(team=>team.name);
        setTeamArr(teamsNameArr)
      },[teams])

  

  const handleChangeInput=(event)=>{

    const {name,value } =event.target;
    setDebateForm(prev=>({
      ...prev,[name]:value
    }))
  }
    

  const getNextTeam=(theTeam)=>{
        return teamArr.find(team =>team !== theTeam)
}

const handleSpeakOrder=(team)=>{
 
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
    <div className='additional_input_form'>

    
       <div className='input_item'>
        <MdFreeBreakfast/>
        <select  name='intervalTime'  value={debateForm?.intervalTime} onChange={handleChangeInput}>
        
        <option  selected disabled value={""}>Interval Duration</option>
         
               {[5,10,15].map((time) => (
          <option  value={time} key={time}>{time} seconds</option>
        ))}

        </select>
      </div>
        
      <div className="input_item">
<RiTeamLine/>

<select onChange={(e)=>setStartBy(e.target.value)}>
  <option disabled selected value="">start debate team</option>
{
   teamArr?.map(item=>(
    <option   value={item}  > {item} </option>
    ))
  }
</select>
  </div>
    </div>
  )
}

export default AdditionalInput