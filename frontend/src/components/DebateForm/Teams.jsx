import React from 'react'
import TeamForm from './TeamForm/TeamForm'

const Teams = ({formLevel,debateForm,setDebateForm ,handleTeamName}) => {

  return (
       <div className={`team_box_container ${formLevel !== 1 && "disable_team_box_container_form" } `}>

   <div className="debate_create_header_top">
    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/user-group-woman-woman--v2.png" alt="user-group-woman-woman--v2"/>
     <h1 className='team_form_header'> <h1>CREATE</h1> TEAMS</h1>
    </div>

        <div className="team_wrapper_box">

          {
            debateForm.teams.map((team, index) => <TeamForm
             debateForm={debateForm}
              setDebateForm={setDebateForm} 
              handleTeamName={handleTeamName}
              team={team}
              index={index}
               key={index} />)}
        </div>

      </div> 
  )
}

export default Teams