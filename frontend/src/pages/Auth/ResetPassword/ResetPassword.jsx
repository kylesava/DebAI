import React from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {resetlink} = useParams()
    
    const handleResetPassword=()=>{

    }
  return (
    <div  className='reset_password_page'>

        <div className='reset_password_content'>

            <h1 className='reset_password_heading_text'>Create new password</h1>
            <p className='reset_password_desc'>Keep  your credentials safe with yourself and dont expose it . </p>
            <div className='reset_password_inputs'>
                <input type="text" placeholder='new password' />
                <input type="text" placeholder='confirm password' />
            </div>
            <button>Reset Password</button>
        </div>
            <p className='resend_bottom_text'>Link expired ? <p className='resent_link_main'> click here to resent reset link</p></p>


    </div>
  )
}

export default ResetPassword