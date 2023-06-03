import { useEffect, useState } from "react";
import { getCountries } from "../../../utils/Api";
import styles from "./User.module.css"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
const User = ({user}) => {

const {data} = useSelector(state=>state.user);
const [flag,setFlag] = useState("")
useEffect(()=>{
  getFlags()
},[user])
const navigate =  useNavigate()
const getFlags=async()=>{
const {data:countryData ,status} =   await getCountries();

if(countryData ,status===200){
 setFlag(countryData.find(country=>country?.name?.common  ===user?.country )?.flags?.svg)
}
}




  return (
    
    <div  onClick={()=>navigate(`/profile/${user?._id}`)} className={`${styles.top_user} ${user?._id === data?._id && styles.own }`}>
        <div className={styles.main_info}>

        <img referrerPolicy="no-referrer" className={styles.top_user_avatar} src={user.avatar} alt={`${user.firstName}'s avatar`} />
 
        <div>
          <div className={styles.user_name_box}>
        <p className={styles.top_username}>{user.firstName} {user.lastName}</p>
          </div>
        <p className={styles.top_email}>{user?.debateCount} debate</p>
        </div>

          <img className={styles.user_country_flag}   src={flag} alt={`${user?.country}'s flag`} style={{display:!flag &&"none"}}/>

        </div>
        <div className={styles.points_box}>
        <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/popular-topic.png" alt="popular-topic"/>
        <p>{user.points}</p>
        </div>

    </div>
  )
}

export default User