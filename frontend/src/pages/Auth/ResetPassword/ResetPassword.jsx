import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetpasswordApi } from '../../../utils/Api'

const ResetPassword = () => {
    const {resetlink} = useParams()
    const [resetData,setResetData] = useState({
      email:"",
      password:"",
      confirmPassword:"",
    })
    const toast   =useToast();
    const navigate  =  useNavigate();

    
    const handleResetPassword=async()=>{

      if(resetData.password !== resetData.password){
        
        return 
      }

      try {
          const {status,message} = await resetpasswordApi(resetlink,{
            password:resetData.password,
            email:resetData.email
          })
          if(status===200){
            navigate("/login");
          }else{

            const {expired,invalidLink} = message
            if(expired){
              throw "Link is expired !! "
            }else if(invalidLink){
              throw "Invalid link !!"
            }else{
              throw "something went wrong"
            }

          }
      } catch (error) {
          
          showToast(error.message,"error")
      }

    }
const handleInputChange=(e)=>setResetData(prev=>({...prev,[e.target.name]:e.target.value}))

    const showToast=(text,type)=>{
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
    <div  className='reset_password_page'>

        <div className='reset_password_content'>

            <h1 className='reset_password_heading_text'>Create new password</h1>
            <p className='reset_password_desc'>Keep  your credentials safe with yourself and dont expose it . </p>
            <div className='reset_password_inputs'>
                <input onChange={handleInputChange} type="text" placeholder='new password' />
                <input onChange={handleInputChange} type="text" placeholder='confirm password' />
            </div>
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
            <p className='resend_bottom_text'>Link expired ? <p className='resent_link_main'> click here to resent reset link</p></p>


    </div>
  )
}

export default ResetPassword