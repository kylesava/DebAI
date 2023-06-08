import { useRef, useState } from "react"
import "../Auth.css"
import { resentLinkToResetPasswordApi } from "../../../utils/Api"
import { useToast } from "@chakra-ui/react"
const SentEmailForPassword = () => {

  const emailRef =useRef()
  const toast =useToast()
  const [sending,setSending] =useState(false)

  const handleSentResetLink=async(e)=>{
    e.preventDefault();

    if(!emailRef.current.value){
      handleShowAlert("Enter your email !","error")
      return ;
    }
    setSending(true)
    try {
        const {data,status}= await resentLinkToResetPasswordApi(emailRef.current.value);
        
              if(status===200){
          handleShowAlert("Reset Link is sent to your email address.","success")
        }
        setSending(false);
        emailRef.current.value=""
    } catch (error) {
        console.log(error)
        const errorMsg=error?.response?.data?.message;
        if(errorMsg){
          handleShowAlert(errorMsg,"error")
        }

        setSending(false)
    }
  }

  const handleShowAlert=(text,type)=>{


      toast({
          title: '',
        description: text ,
        status: type,
        duration: 5000,
        position: "top",
        isClosable: true,
      })


  }


  return (
    <div className={"sentEmailForPasswordPage"}>

<div className="email_reset_image_wrapper">

        <img src="/images/resetemail.png" alt="reset email" />
</div>
    <div className="reset_email_main_content">
        <form onSubmit={handleSentResetLink}>


        <h1 className="reset_password_heading_text">Reset Password</h1>

        <p>  Enter the email associated with your account and we will send an email with instructions to reset your password. </p>

        <input ref={emailRef} className={"reset_link_email"} type="email" name="email" placeholder={"your email address"} />
        <button  type="submit" className={"reset_link_email_button"}>  {sending ? "Sending":"Sent Link"}</button>

        </form>
    </div>



    </div>
  )
}

export default SentEmailForPassword