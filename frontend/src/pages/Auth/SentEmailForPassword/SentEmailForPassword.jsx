import "../Auth.css"
const SentEmailForPassword = () => {
  return (
    <div className={"sentEmailForPasswordPage"}>

<div className="email_reset_image_wrapper">

        <img src="/images/resetemail.png" alt="reset email" />
</div>
    <div className="reset_email_main_content">
        <div>


        <h1 className="reset_password_heading_text">Reset Password</h1>

        <p>  Enter the email associated with your account and we will send an email with instructions to reset your password. </p>
        <input className={"reset_link_email"} type="email" name="email" placeholder={"your email address"} />
        <button className={"reset_link_email_button"}>   Sent Link</button>

        </div>
    </div>



    </div>
  )
}

export default SentEmailForPassword