import React from 'react'
import { emailConfirmationApi } from '../../utils/Api'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "./confirmation.module.css"
import {bindActionCreators} from "redux"
import {useDispatch} from "react-redux"
import { actionCreators } from '../../redux/store'
import { useToast } from '@chakra-ui/react'

const Confirmation = () => {

    const {confirmationCode} = useParams();
    const navigate =useNavigate()   ;
    const dispatch =useDispatch()
    const toast =useToast()
    const {AddLoggedInUser} = bindActionCreators(actionCreators ,dispatch )

    const handleConfirm=async()=>{


    if(!confirmationCode)return;

    try {

        const {data,status } = await emailConfirmationApi(confirmationCode); 
         
        if(status===200){
          const {exp,message} = data
          console.log(message,exp,)
          if(!exp){
            AddLoggedInUser(message)
            navigate("/")
            handleShowAlert("Email confirmed","success")
          }else{
            throw "link expired"
          }
        }

    } catch (error) {
      console.log(error);
      handleShowAlert(error,"error");
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
    <div className={styles.confirmation_page}>
      <div className={styles.confirmation_page_box}>
          <img src="/images/confirm.png" alt="confim image" />
          <p className={styles.confirm_desc}>Great!! Confirm Your Email and Unlock the Power of DeBAI ! 💥</p>
          <button  className={styles.confirm_button} onClick={handleConfirm}>CONFIRM NOW </button>


    </div>



    </div>
  )
}

export default Confirmation
