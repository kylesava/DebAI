import React, { useState } from 'react'
import SelectedParticipants from '../../Participants/selectedParticipants/SelectedParticipants'
import styles from "../EditUserForm/EditUserForm.module.css";
import SelectParticipants from '../../../Layouts/popovers/selectParticipants/SelectParticipants';
import useAlert from '../../../hook/useAlert';

const EditDebateSearchParticipants = (  { debateData, setDebateData, handleChangeDebateName,handleRemoveSelectedParticipants,team,index}) => {


  console.log(debateData)

    const {open} = useAlert()
    const [searchInput,setSearchInput] =useState("")
      const isUserInTeam=(user)=>{
    let debateTeams =debateData ;
    const exist = debateTeams.filter(team => team.members.find(teamMember => teamMember._id === user._id))
    if (exist.length > 0) {
     open({type:"error",text:`${user.firstName} is already in a team.`})
      return true
    }
    return false
  }

    const handleSelectParticipants=(person)=>{

    if(isUserInTeam( person))return;

      setDebateData(prev=>{
        return {
          ...prev, 
          teams:prev.teams.map((team,_ind )=>{

            if(_ind===index){
              return {...team,members:[...team.members,person]}
            }else{
              return team;
            }
          })
        }
      })
    }


  return (
  <div className={styles.team_box_item}>
        <input onChange={(e)=>handleChangeDebateName(e,index)} value={team.name} placeholder="team name"/>   
            <input type="text"  placeholder="add participants" onChange={(e)=>setSearchInput(e.target.value)} />
                    <SelectedParticipants removeSelectedParticipants={handleRemoveSelectedParticipants} index={index} selectedParticipants={team.members} /> 
                    {
                        searchInput.length >0 && <SelectParticipants participantsSearchInput={searchInput} selectedParticipants={team.members} team={team} handleSelectParticipants={handleSelectParticipants} />
                    }

      
    </div> 
  )
}

export default EditDebateSearchParticipants