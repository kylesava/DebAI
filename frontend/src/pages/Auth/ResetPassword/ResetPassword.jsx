import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useToast} from "@chakra-ui/react"
import { checkIfTokenIsValidApi, resentLinkToResetPasswordApi, resetpasswordApi } from '../../../utils/Api'
import Invalid from '../../../components/Invalid/Invalid'

const ResetPassword = () => {
    const {resettoken} = useParams()
    const [resetData,setResetData] = useState({
      email:"",
      password:"",
      confirmPassword:"",
    })
    const toast   =useToast();
    const navigate  =  useNavigate();
    const [invalidToken,setInvalidToken]= useState(null)
    const [ isExpired,setIsExpired] =useState(null);
    const [userEmail,setUserEmail] = useState(null)
    useEffect(()=>{
      if(!resettoken){
        setInvalidToken(true)
        return 
      }
      handleCheckIfTokenIsValid(resettoken)
    },[resettoken])
    

    useEffect(()=>{
      if(invalidToken){
        showToast("reset link is invalid","error")
      }else if(isExpired){
        showToast("reset link is expired","error")
      }
    },[invalidToken,isExpired])


    const handleCheckIfTokenIsValid=async(token)=>{
      try {
          const {data} =await checkIfTokenIsValidApi(token);
          console.log(data)
          const {message:{exp,invalidLink,email}} = data;
          if(email){

            setUserEmail(email)
            setInvalidToken(false);
            setIsExpired(false)
          }else{
            setInvalidToken(invalidLink);
            setIsExpired(exp)
          }
      } catch (error) {
        console.log(error)
      }
    }

  

    const handleResetPassword=async()=>{

      if(resetData.confirmPassword !== resetData.password){
        showToast("password is not same.","error")
        return 
      }

      try {
          const {status,message} = await resetpasswordApi(resettoken,{
            password:resetData.password,
            email:userEmail
          })
          if(status===200){
            showToast("password reset successfully ","success")
            navigate("/login",{
              state:{
                from:"reset_password",
                email:userEmail ?? "",
              }
            });
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

    console.log(resetData,userEmail)
    

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

    {
  ( invalidToken !==null && isExpired !== null) && (  invalidToken || isExpired ) ? <Invalid invalidToken={invalidToken} isExpired={isExpired}/> :


        <div className='reset_password_content'>
            <h1 className='reset_password_heading_text'>Create new password</h1>
            <p className='reset_password_desc'>Keep  your credentials safe with yourself and dont expose it . </p>
            <div className='reset_password_inputs'>
                <input onChange={handleInputChange} type="password" name='password' placeholder='new password' />
                <input onChange={handleInputChange} type="password" name='confirmPassword' placeholder='confirm password' />
            </div>
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
  }


 <p className='resend_bottom_text'>Link expired ? <p className='resent_link_main' onClick={()=>navigate("/login")} > Go to login and click on  forgot password  .</p></p>
 



    </div>
  )
}

export default ResetPassword