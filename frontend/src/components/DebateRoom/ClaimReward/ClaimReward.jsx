import React, { useEffect, useState  } from 'react'
import {useSelector} from "react-redux"
import styles from "./ClaimReward.module.css"
import { getMysterAvatar } from '../../../utils/services'
import { IoIosDoneAll } from 'react-icons/io';
import {GiPerspectiveDiceSixFacesSix} from "react-icons/gi"
import {  addAvatarEquipedMembersInDebate, updateUserapi } from '../../../utils/Api';
import { useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';


const ClaimReward = ({debateResult ,setGoToNext ,activeDebate}) => {
  const {data:currentUser} = useSelector(state=>state.user)
  const [mysteryAvatarResult ,setMysteryAvatarResult] = useState(null);
  const [claimed,setClaimed] =useState(false)
  const toast =useToast();
  const {debateId} = useParams()



  useEffect(()=>{
    if(!activeDebate || !currentUser)return;

   setClaimed(activeDebate.avatarEquipedMembers.some(mem=>mem === currentUser._id))

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
      await updateUserapi(_id ,{
        equipedAvatars:[
          ...prevAvatars,
          {
            type:mysteryAvatarResult.type,
            avatar:mysteryAvatarResult.avatar
          }
        ]
      })
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
        <img className={`${styles.mysteryImg} ${mysteryAvatarResult?.avatar && styles.avatarStyles}`} src={`${ mysteryAvatarResult ? mysteryAvatarResult.avatar :"/images/mystery_prev_ui.png"}`} alt="mystery box" />
      }  
      {
        mysteryAvatarResult ? <h4 className={styles.avatarsType}> {mysteryAvatarResult.type} Avatar</h4> :""
      }
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
           <p>Claimed </p>
           </button>
      }
  

    </div>
  )
}

export default ClaimReward