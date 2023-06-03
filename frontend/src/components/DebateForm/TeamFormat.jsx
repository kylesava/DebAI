import React from 'react'
import DebateFormat from './DebateFormat/DebateFormat'

const TeamFormat = ({setDebateForm,debateForm}) => {
  return (
    

        <DebateFormat setDebateForm={setDebateForm} debateForm={debateForm} teams={debateForm.teams}/>
       
  )
}

export default TeamFormat