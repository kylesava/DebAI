import React, { createRef, useEffect, useRef, useState } from 'react'
import styles from "./DebatePasscodeInput.module.css"
import { HiOutlineViewfinderCircle } from 'react-icons/hi2'
import { getDebateByPassocde } from '../../../../utils/Api';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
const DebatePasscodeInput = () => {
  
const toast  = useToast() 
  const navigate = useNavigate();
  const {data} = useSelector(state=>state.user);
  const [loading,setLoading] =useState(false)


  const otpInputs = Array.from({ length: 6 }, () => createRef (null));

  const handleKeyUp = (index, e) => {
    if (e.target.value.length === e.target.maxLength && index < otpInputs.length - 1) {
      otpInputs[index + 1].current.focus();
    }
  };

  useEffect(()=>{
    const handleBackspace = (index, e) => {
      if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
        otpInputs[index - 1]?.current?.focus();
      }
    };

    otpInputs.forEach((inputRef, index) => {
      inputRef.current.addEventListener('keydown', (e) => handleBackspace(index, e));
    });
  },[otpInputs])

  const handleWatchDebate=async()=>{


    let debateCodeInput = "";
    otpInputs.forEach(ref=>{
      debateCodeInput += ref.current.value.toString();
    });
    setLoading(true)
    try {
        const {data,status} = await getDebateByPassocde(+debateCodeInput)
        setLoading(false)
      
        if(status===200){
          
          const {message} = data;
          
          if(message.length ===0){
            toast({
              title: '',
              description: "No debate found with this passcode ",
              status: 'error',
              duration: 5000,
              position: "top",
              isClosable: true,
            })
            return 
          }
          navigate(`/watch/${message[0]?._id}`,{
            state:message[0]
          })

        }else throw "some"
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }


  return (
    <>
      <div className={styles.passcode_wrapper}>

    <div className={styles.passcode_input_box} >
    {
      otpInputs.map((inp,index)=>(
        
        <input key={index} type="number"  maxLength={"1"} placeholder='0'  ref={inp} onChange={(e)=>handleKeyUp(index,e)}/>
        ))
      }

    </div>
    <div className={styles.passcode_text}>
      Enter a passcode of a debate ! 
    </div>
      <button className={styles.watchButton }  onClick={handleWatchDebate}>  <HiOutlineViewfinderCircle className="watch_icon"/> {loading?"JOINING" :"JOIN NOW"}  </button>
      </div>
    </>
  )
}

export default DebatePasscodeInput