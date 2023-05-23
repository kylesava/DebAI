import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { LoginUserApi } from '../../../utils/Api';
import { bindActionCreators } from "redux"
import { actionCreators } from '../../../redux/store';
import { useToast } from '@chakra-ui/react';
import "../Auth.css"
import { setLoggedInUserData } from '../../../utils/services';


const Login = () => {



  const [loginData, setLoginData] = useState({
    error: "",
    data: {
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { AddLoggedInUser } = bindActionCreators(actionCreators, dispatch)
  const toast = useToast()
  const handleInputChange = (name, value) => {
    setLoginData(prev => ({
      ...prev, data: { ...prev.data, [name]: value }
    }))
  }


  const handleLogin = async () => {




    try {

      const res = await LoginUserApi(loginData.data);
      
      if (res.status === 200 && res.data.message) {

        const {message} = res.data

        AddLoggedInUser(message);
          
        navigate(-1);
        toast({
          title: '',
          description: "You Logged in successfully",
          status: 'success',
          duration: 5000,
          position: "top",
          isClosable: true,
        })
      } else {
        throw Error(res.data.message)
      }


    } catch (error) {
      toast({
        title: '',
        description: "Invalid Credentials",
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      console.log(error)
    }


  }
  const handleKeyDown=async(e)=>{
    if(e.key==="Enter"){
    await  handleLogin()
    }
  }
  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_blank')
  }

  return (
    <div className='AuthWrapper'>
      <img draggable={false} className='dinasour_image' src='/images/dinasour_coffee.png' alt='dinasourImg' />
      <div className="login_main_box">

        <img draggable={false} className='logo_img' src="/images/logo.jpg" alt="logo" />
        <div className="login_welcome_text">
          {/* <h5 className='welcome_back_text'>Welcome back 😋</h5> */}
          {/* <p className='welcome_secondary_text'>Continue again where you left from </p> */}
        </div>
        <div className='login_with_google_box' onClick={handleGoogleLogin}>
          <img src="/images/google.png" alt="googleIcon" />
          <p>
            Continue with Google
          </p>
        </div>
        <div className='sign_in_with_email_division' >

          <div className="left_hr"></div>
          <p>or sign in with email</p>
          <div className="right_hr"></div>

        </div>
        <div className='form_wrapper'>

          <div className='auth_input_item'>

            <label>Email</label>
            <input onKeyDown={handleKeyDown} className="input_element" type="email" placeholder='Enter  your email address' value={loginData.data.email} onChange={(e) => handleInputChange("email", e.target.value)} />

          </div>
          <div className='auth_input_item'>

            <label>Password</label>
            <input  onKeyDown={handleKeyDown} className="input_element" type="password" placeholder='Enter  your  password' value={loginData.data.password} onChange={(e) => handleInputChange("password", e.target.value)} />

          </div>
          <div className='bottom_other_options'>

            <div className='checkbox_item'>

              <input type="checkbox" />
              <p>Remember me</p>

            </div>
            <p className='forgot_password_text'>
              Forgot your password?
            </p>

          </div>
          <button className='login_button' onClick={handleLogin}>
            Login
          </button>
          <Link to={"/signup"}>
            <p className='no_account_text'>I don't have account </p>
          </Link>


        </div>
      </div>
    </div>
  )
}

export default Login