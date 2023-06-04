import React from 'react'
import TeamForm from './TeamForm/TeamForm'

const Teams = ({formLevel,debateForm,setDebateForm ,handleTeamName}) => {
  return (
       <div className={`team_box_container ${formLevel !== 1 && "disable_team_box_container_form" } `}>

        <div className='lable_row'>

        </div>
        <div className="team_wrapper_box">

          {
            debateForm.teams.map((team, index) => <TeamForm
             debateForm={debateForm}
              setDebateForm={setDebateForm} 
              handleTeamName={handleTeamName}
               team={team} index={index} key={index} />)}
        </div>
          <div className='team_info_text'>

            <span >Members must be registed in this site</span>
          </div>

      </div> 
  )
}

export default Teams