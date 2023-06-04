import React from 'react'

const ConfirmCreate = ({currentUser,handleCreateDebate}) => {
  return (
<>
<div className='confirm_create_box'>
      <img src="/images/completed.png" alt="completed" width="200px" />
      <button type='submit' className='create_debate_btn' disabled={!currentUser} onClick={handleCreateDebate}>
        CREATE DEBATE!
      </button> 
      <p>Now you are ready to create a new debate !!</p>
</div>
</>
  )
}

export default ConfirmCreate