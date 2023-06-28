import React, { useEffect, useState } from 'react'
import styles from "./dashboardItem.module.css"
import {Link} from 'react-router-dom'
import { getUserStatsApi } from '../../../utils/Api'
const DashboardItem = () => {

  const [userStats,setUserStats]=useState({
    total_count:null,
    stats:null
  })

  useEffect(()=>{
    fetchUserStatistics()
  },[])

  const fetchUserStatistics=async()=>{
    try {
        const {data,status} = await getUserStatsApi(1)
        const {stats,user_count} = data.message;

        console.log(stats )
        setUserStats({
          total_count :user_count,
          stats  
        })

    } catch (error) {
        console.log(error)      
    }
  }

  return (
    <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>USERS</h1>
      <div  className={`${styles.item_result}`}>
        {userStats.stats}%
      </div>

      </div>

 <div className={styles.data}>
  {userStats.total_count}
 </div>
<div className={styles.item_footer}>

 <Link to="user">
 <p className={styles.item_link}>see all users</p>
 </Link> 
    
  <div className={styles.item_icon}>

    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/change-user-male.png" alt="change-user-male"/>

  </div>

</div>


    </div>
  )
}

export default DashboardItem