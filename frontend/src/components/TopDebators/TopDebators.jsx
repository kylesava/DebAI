import { getTopUsersApi } from "../../utils/Api"
import styles from "./TopDebators.module.css"
import {useState,useEffect} from "react"
import User from "./users/User"
const TopDebators = () => {

const [topUsers, settopUsers] = useState([])

useEffect(() => {
    getTopDebators()
}, [])

const getTopDebators=async()=>{

    try {
            const {data,status} = await getTopUsersApi();
            if(status===200){
                const {message} = data;
                settopUsers(message)
            }
    } catch (error) {
            console.log(error)
    }
}


  return (
    <div className={styles.top_debators}>


    <div className={styles.top_debators_heading}>
        <h4 className={styles.top_debators_main_text}> <img width="64" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-first-prize-achievements-flaticons-lineal-color-flat-icons-2.png" alt="external-first-prize-achievements-flaticons-lineal-color-flat-icons-2"/> Top 10 Debators in DebAi</h4>
        <p className={styles.top_deb_sub_heading}>DebAi ranks debators by their points.Win more debate to earn points.</p>
    </div>

<div className={styles.top_users_list}>
    <div className={styles.list_item}>
    {
        topUsers.slice(0,5).map(user=>(
            <User  key={user._id} user={user}/>
        ))
    }
    </div>
    <div className={styles.list_item}>
    {
        topUsers.slice(5,10).map(user=>(
            <User  key={user._id} user={user}/>
        ))
    }
    </div>

</div>

    </div>
  )
}

export default TopDebators