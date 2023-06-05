import { useEffect, useState } from "react"
import UserProfile from "../../../Layouts/popovers/viewprofile/UserProfile"
import { getFlag } from "../../../utils/services"
import "./ParticipationPerson.css"

const ParticipantPerson = ({ person }) => {

  const [flag,setFlag] =useState("");
  useEffect(()=>{
    getUserFlag()
  },[person])
  async function getUserFlag(){
   const userFlag = await  getFlag(person?.country);
   if(userFlag){
    setFlag(userFlag)
   }


  }

  return (
    <UserProfile userId={person?._id}>

      <div className='ParticipantsPersonWrapper'>
        <img className='participation_person_img' referrerPolicy="no-referrer" src={person?.avatar} alt='userImg' />
        <div className="participation_person_box">
      <img style={{display:`${!flag && "none"}`}} src={flag} width={"25px"} alt="" />
        <p>
          {person?.firstName}
        </p>
        </div>
      </div>
    </UserProfile>
  )
}

export default ParticipantPerson