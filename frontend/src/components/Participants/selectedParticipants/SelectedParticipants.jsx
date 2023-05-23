import React from 'react'

import { IoMdClose } from "react-icons/io"

import "./SelectedParticipants.css"
const SelectedParticipants = ({ selectedParticipants, removeSelectedParticipants, index }) => {
  return (
    <div className='SelectedParticipantsWrapper'>
      {
        selectedParticipants.map(person => (

          <div key={person._id} className="selected_participants">

            <img src={person.avatar} alt="avatarImg" />
            <div className="username">{person.firstName}</div>
            <div onClick={() => removeSelectedParticipants(person, index)} className='delete_button'>
              <IoMdClose />
            </div>
          </div>
        ))
      }


    </div>
  )
}

export default SelectedParticipants