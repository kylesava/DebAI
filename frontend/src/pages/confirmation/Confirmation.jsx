import React from 'react'
import { emailConfirmationApi } from '../../utils/Api'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "./confirmation.module.css"
import {bindActionCreators} from "redux"
import {useDispatch} from "react-redux"
import { actionCreators } from '../../redux/store'

const Confirmation = () => {

    const {confirmationCode} = useParams();
    console.log(confirmationCode)
    const navigate =useNavigate()   ;
    const dispatch =useDispatch()
    const {AddLoggedInUser} = bindActionCreators(actionCreators ,dispatch )

    const handleConfirm=async()=>{


    if(!confirmationCode)return;

    try {

        const {data,status , exp} = await emailConfirmationApi(confirmationCode);  
        if(status===200){
          const {exp,message} = data
          console.log(message)
          if(!exp){
            AddLoggedInUser(message)
            navigate("/")
          }else{
            throw Error("link expired")
          }
        }

    } catch (error) {
      console.log(error)
    }
}



  return (
    <div className={styles.confirmation_page}>

    <button onClick={handleConfirm}>CONFIRM NOW </button>


    </div>
  )
}

export default Confirmation