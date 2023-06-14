import React, { useEffect, useState  } from 'react'
import {useDispatch, useSelector} from "react-redux"
import styles from "./ClaimReward.module.css"
import { getMysterAvatar } from '../../../utils/services'
import { IoIosDoneAll } from 'react-icons/io';
import {GiPerspectiveDiceSixFacesSix} from "react-icons/gi"
import {  addAvatarEquipedMembersInDebate, updateUserapi } from '../../../utils/Api';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/store';
import { BiArrowFromLeft, BiArrowToLeft } from 'react-icons/bi';
import { Enums } from '../../../redux/action/actionTypes/Enumss';


const ClaimReward = ({debateResult ,setGoToNext ,activeDebate ,judgeType ,goToNext,handleNext}) => {
  const {data:currentUser} = useSelector(state=>state.user)
  const dispatch =useDispatch()
  const {AddLoggedInUser} = bindActionCreators(actionCreators,dispatch )
  const [mysteryAvatarResult ,setMysteryAvatarResult] = useState(null);
  const [claimed,setClaimed] =useState(false)
  const toast =useToast();
  const {debateId} = useParams()
  const navigate =useNavigate()



  useEffect(()=>{
    if(!activeDebate || !currentUser)return;

   setClaimed(activeDebate.avatarEquipedMembers.some(mem=>mem === currentUser._id))
  setGoToNext(activeDebate.avatarEquipedMembers.some(mem=>mem === currentUser._id))
  },[activeDebate ,currentUser])



  const handleOpenMysteryBox =()=>{
    console.log( getMysterAvatar(debateResult))
    setMysteryAvatarResult(  getMysterAvatar(debateResult))
  }
  const handleClaimReward=async()=>{
    if(!currentUser)return;
    const {_id} = currentUser;
    const prevAvatars = currentUser?.equipedAvatars ?? []
    try {
    const {data} =   await updateUserapi(_id ,{
        equipedAvatars:[
          ...prevAvatars,
          {
            type:mysteryAvatarResult.type,
            avatar:mysteryAvatarResult.avatar
          }
        ]
      })
      AddLoggedInUser(data.message);
      await addAvatarEquipedMembersInDebate(debateId,_id)
      setClaimed(true)
      showToast("Avatar Equiped");
      setGoToNext(true)
    } catch (error) {
    }
  }

  const showToast=(text)=>{
    toast({
      title: '',
      description: text,
      status: 'success',
      duration: 5000,
      position: "top",
      isClosable: true,
    })
  }



  return (
    <div className={styles.claimRewardContainer}>

      {
     !claimed   && <img className={`${styles.mysteryImg} ${mysteryAvatarResult?.avatar && styles.avatarStyles}`} src={`${ mysteryAvatarResult ? mysteryAvatarResult.avatar :"/images/mystery.png"}`} alt="mystery box" />
      }  
      {
        mysteryAvatarResult ? <h4 className={styles.avatarsType}> {mysteryAvatarResult.type} Avatar</h4> :""
      }


         

             <div className={styles.mysteryButtonBox}>

        
          
          <button className={styles.nextButton} onClick={()=>navigate("/alldebates")}>
        BACK
            <BiArrowToLeft className={styles.backIcon}/>
        </button>


   {  
       (!mysteryAvatarResult && !claimed) &&  <button className={styles.mystryButton} onClick={handleOpenMysteryBox}>  
       <GiPerspectiveDiceSixFacesSix/>
       <p>

        Open mystery box
       </p>
        </button>
          } 

      {
      ((mysteryAvatarResult && !claimed)) && <button className={styles.mystryButton} onClick={handleClaimReward}> Claim Avatar</button>
      }
      {
          (( mysteryAvatarResult && claimed) || claimed) && <button className={styles.mystryButton}> 
           <IoIosDoneAll/>
           <p>Avatar Claimed </p>
           </button>
      
      } 
       {
         ( judgeType===Enums.AIJUDGE  ) && <button className={styles.nextButton} onClick={()=>handleNext(Enums.TRANSCRIPT_TAB)}>
          <BiArrowFromLeft  color="white"  fill="white" />
          Next
        </button>
        }
</div>

    
    </div>  

 
  )
}

export default ClaimReward