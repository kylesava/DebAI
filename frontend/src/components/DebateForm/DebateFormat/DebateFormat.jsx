import "./debateFormatBox.css"
import {TiGroup} from "react-icons/ti"
import {RiTimerFlashFill} from "react-icons/ri"
import {CgMenuMotion} from "react-icons/cg"
import { useEffect, useState } from "react"
import { TimeFormatMappingMethod } from "../../../utils/data"
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
    {

    (teamArr[0] && teamArr[1])  ?  <div className="team_format_container">

      <div className="header_text_with_bg">

<p> Time Format for {debateForm.type}</p>
      </div>
      <div   className="team_format_header">
      <div className="team_format_team_selection">

        <h2 className="team_format_selection_text">Select  which team will speak first</h2>

      <select onChange={(e)=>setStartBy(e.target.value)}>
        <option disabled selected value="">--select-team--</option>
      {
         teamArr?.map(item=>(
          <option   value={item}  > {item} </option>
          ))
        }
      </select>
        </div>
      </div>
    <div className='debateFormatBox'>

      <table>
      <thead>

    <th>
      <div>
        <CgMenuMotion/>
<p>
      {/* SN  */}

</p>
      </div>
    </th>
    <th>
    <div>

    <TiGroup/>
      <p>

      Team Name 
      </p>
    </div>
    </th>
    <th>
      <div>

      <RiTimerFlashFill/>
      <p>
      Speak Time

      </p>
      </div>
    </th>

      </thead>
      <tbody>
        
        {
          debateForm?.timeFormat &&   debateForm.timeFormat.map((item,index)=>(
            <tr className="debate_format_item"> 
            <td className="t_data t_data_sn">{index+1}</td>
            <td className="t_data t_data_team_name">  <p> 
              {item.team}
              
              </p> 
              </td>
           <td className="t_input_data">
      
            <input min={1} disabled={debateForm.type==="Lincoln–Douglas"} onChange={(e)=>handleSpeakTimeChange(e,index)} type="number" name="" id="" value={item.time}/>
            </td> 
   
    </tr>
))

}
</tbody>
</table>

    </div>
</div>:""
}
</>
  )
}

export default DebateFormat
