import React from 'react'

const ConfirmCreate = ({currentUser,handleCreateDebate}) => {
  return (
<>
<div className='confirm_create_box'>

      <p>Now you are ready to create a new debate !!</p>
      <button type='submit' className='create_debate_btn' disabled={!currentUser} onClick={handleCreateDebate}>
        CREATE DEBATE!
      </button> 
</div>
</>
  )
}

export default ConfirmCreate