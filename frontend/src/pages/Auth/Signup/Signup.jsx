import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddLoggedInUser } from '../../../redux/action/actionCreators';
import { RegisterUserApi, getCountries } from '../../../utils/Api';
import "../Auth.css"
import SelectCountry from '../../../Layouts/popovers/selectCountry/SelectCountry';





const Signup = () => {  


  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country:"",
    others: {
      missingFields: [],
      error: ""
    }
  })
  const navigate = useNavigate()
  const toast = useToast()
  const [countries,setCountries] =useState([])
  const [loading,setLoading] = useState(false)
  const handleInputChange = (name, value) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }



useEffect(()=>{
  handleGetCountries()
},[])

const handleGetCountries=async()=>{

  try {
      const {data,status} = await getCountries()
      if(status!==200)return;
      
      setCountries(data);
  } catch (error) {
    console.log(error)
  }
}


  const handleRegister = async (e) => {
    e.preventDefault()
    let fieldsMissing = false
    for (const key in userDetails) {
      if (Object.prototype.hasOwnProperty.call(userDetails, key)) {
        let missingKey = userDetails[key]
        if (!missingKey) {
          setUserDetails(prev => ({ ...prev, others: { ...prev.others, missingFields: [...prev.others.missingFields, key] } }))
          fieldsMissing = true
        }
      }
    }
    if (fieldsMissing) {
      handleShowAlert("fill all the fields","error")
    }


    try {
      setLoading(true)
      let payloadData = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: userDetails.password,
        email: userDetails.email,
        country:userDetails.country
      }
      const res = await RegisterUserApi(payloadData);
      setLoading(false)
      if (res.status === 200) {
        navigate("/account/confirmation_email_sent",{
          state:{
            email:userDetails?.email
          }
        })
      } else {
        throw Error(res.data.message)
      }

    } catch (error) {
      setLoading(false)
      const errorMsg = error?.response?.data?.message;
          console.log(errorMsg)   
          handleShowAlert(errorMsg??"something went wrong","error")
    }

  }

  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_blank')
  }

  const handleKeyDown=async(e)=>{
    if(e.key==="Enter"){
    await  handleRegister()
    }
  }
  const handleShowAlert=(text,type)=>{
    toast({
      title: '',
      description: text,
      status: type,
      duration: 5000,
      position: "top",
      isClosable: true,
    })
  }
  return (
    <div className='AuthWrapper'>
      <div className="login_main_box">
        <img draggable={false} className='logo_img' src="/images/logo.jpg" alt="logo" />
        <div className="login_welcome_text">
          {/* <h5 className='welcome_back_text'>Welcome  😋</h5>
        <p className='welcome_secondary_text'>Get started with Debatosour now !! </p> */}
        </div>
        <div className='login_with_google_box' onClick={handleGoogleLogin}>
          <img src="/images/google.png" alt="googleIcon" />
          <p>
            Continue with Google
          </p>
        </div>
        <div className='sign_in_with_email_division' >

          <div className="left_hr"></div>
          <p>or sign up with email</p>
          <div className="right_hr"></div>

        </div>
{/* 
        <div className='auth_input_item'>

          <label>Choose Avatar </label>
          <AvatarCarousel currentAvatar={userDetails.avatar} onChange={handleInputChange} />
        </div> */}
        <form className='form_wrapper' onSubmit={handleRegister}>
          <div className='single_item'>

            <div className='auth_input_item'>

              <input className="input_element" type="text" placeholder='First Name'
                value={userDetails.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)} />

            </div>
            <div className='auth_input_item'>

              <input className="input_element" type="text" placeholder='Last Name'
                value={userDetails.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)} />

            </div>
          </div>
          <div className="single_item">


          <div className='auth_input_item'>


            <input className="input_element" type="email" placeholder='Enter your email address'
              value={userDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)} />

          </div>
           <div className='auth_input_item'>


        <SelectCountry countries={countries}  handleInputChange={setUserDetails}>
          <div className='input_element' style={{height:"100%" ,color:"rgba(128, 128, 128, 0.678)" , display:"flex",alignItems:"center"}}>
            <p>

        {
          userDetails.country ? userDetails.country :"select country"
        }

</p>

          </div>
        </SelectCountry>

          </div>
              </div>
          <div className="single_item">

            <div className='auth_input_item'>

              <input onKeyDown={handleKeyDown} className={`input_element ${userDetails?.password !== userDetails.confirmPassword ? "error_input" : ""}`} type="password" placeholder='Enter your password'
                value={userDetails.password}
                onChange={(e) => handleInputChange("password", e.target.value)} />

            </div>
            <div className='auth_input_item'>

              <input onKeyDown={handleKeyDown} className={`input_element ${userDetails?.password !== userDetails.confirmPassword ? "error_input" : ""}`} type="password" placeholder='Confirm password'

                value={userDetails.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)} />

            </div>
          </div>
          <div className='bottom_other_options'>



          </div>

          <button className='login_button' type='submit'>
            {loading?"Signing in":"Sign in"}
          </button>
          <Link to="/login">
            <p className='no_account_text'>Already have account </p>
          </Link>


        </form>
      </div>
    </div>
  )
}

export default Signup