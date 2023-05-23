import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import SearchedParticipantsList from '../../Participants/SearchedParticipantsList/SearchedParticipantsList';
import SelectedParticipants from '../../Participants/selectedParticipants/SelectedParticipants';
import { GrClose } from "react-icons/gr"
import "./TeamForm.css"





const TeamForm = ({ team, index, handleTeamName, setDebateForm, debateForm }) => {


  const toast = useToast()
  const [participantsSearchInput, setParticipantsSearchInput] = useState("")
  const handleSelectParticipants = (user, teamIndex) => {
    // setDebateForm
   
    const valid = handleTeamParticipantsValidation(user,teamIndex)

    if(!valid)return;

    setDebateForm((prev) => ({



      ...prev, teams: prev.teams.map((team, index) => {
        if (index === teamIndex) {
          return { ...team, members: [...team.members, user] }

        } else {
          return team
        }
      })
    }))
  }

  const removeSelectedParticipants = (user, teamIndex) => {
    let debateTeam = debateForm.teams;
    //  let filteredDebateTeam= debateTeam.map(team=>  team.members.filter(teamMember=>teamMember._id !== user._id))
    let filteredTeam = debateTeam.map(team => ({ ...team, members: team.members.filter(teamMember => teamMember._id !== user._id) }))
    setDebateForm((prev) => ({
      ...prev, teams: filteredTeam
    }))
  }

  const handleTeamParticipantsValidation=(user,index)=>{
    let debateTeams = debateForm.teams;
    let full =false;
    let error = "";
    if(debateForm.type==="Lincoln–Douglas"){
        full=  debateForm.teams[index].members.length >= 1;
      error="Lincoln-Douglas can have only one participant in a team"
    }else if(debateForm.type === "British Parliamentary"){

      console.log("british",parseInt(debateForm.team_format),debateForm.team_format)
        full=  debateForm.teams[index].members.length >= parseInt(debateForm.team_format);

        if(debateForm.team_format === "2"){
          error = `participants limit exceeded change team format to 4 vs 4`
        }else{

          error=`Maximum partcipants exceeded`
        }

    }else{
      full=  debateForm.teams[index].members.length >= 4;
      error="Team can have only 4 participants"
    }

    if (full) {

      toast({
        description: error,
        status: 'error',
        duration: 3000,
        position: "top",
        isClosable: true,
      })
      return false;
      
    }

    // if the user already exist
   if(isUserInTeam(user))return false


    return true
  }

  const isUserInTeam=(user)=>{
    let debateTeams = debateForm.teams;
    const exist = debateTeams.filter(team => team.members.find(teamMember => teamMember._id === user._id))
    if (exist.length > 0) {
      toast({
        description: "This user is already in a team",
        status: 'error',
        duration: 3000,
        position: "top",
        isClosable: true,
      })
      return true
    }
    return false
  }


  return (
    <div className='teamFormWrapper' pinkBg={index === 1 ? true : false}>

      <h2>Team {index + 1} </h2>
      <SelectedParticipants index={index} removeSelectedParticipants={removeSelectedParticipants} selectedParticipants={team.members} />
      <div className='team_form_input_box'>

        <input type="text" className='search_team_name_input' placeholder='Enter team name' name="name" onChange={(e) => handleTeamName(e, index)} value={team.name} />
        <div className='search_user_input'>
          <input type="text" placeholder='Add member...' className='addMember_input' onChange={(e) => setParticipantsSearchInput(e.target.value)} value={participantsSearchInput} />
          {

            participantsSearchInput.length > 0 && <GrClose className={"searchUserSvgClose"} onClick={() => setParticipantsSearchInput("")} />
          }
        </div>
      </div>

      <SearchedParticipantsList index={index} handleSelectParticipants={handleSelectParticipants} selectedParticipants={team.members} participantsSearchInput={participantsSearchInput} />
    </div>
  )
}

export default TeamForm