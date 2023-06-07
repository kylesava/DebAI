import React from 'react'
import "../Auth.css"
const ConfirmationEmailSent = () => {
  return (
    <div className={"confirmation_email_sent_page"}>

      <div className='confimation_email_sent_box'>

        <img src="/images/emailSent.png" alt="" />
        
        <div className='email_sent_content_box'>
          <p className="email_sent_alert_box">
            Check your mail .
            </p>
            <p className='email_desc'>Please check your email.
         we have sent an email that contains a link to confirm your email address.</p>
            <p className='user_email_text'>
            santoshkunwar9454@gmail.com
            </p>
            <button className='resent_button'>RESEND EMAIL</button>

            <small className='resent_email_expires_time'>Did not receive  the email ? Check your spam filter or try again with another email.</small>


        </div>

      </div>







    </div>
  )
}

export default ConfirmationEmailSent;