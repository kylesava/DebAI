import React, { useEffect, useState } from 'react'
import styles from "./dashboardItem.module.css"
import { Link } from 'react-router-dom'
import { getDebateStatsApi } from '../../../utils/Api'
const DashboardItemDebate = () => {

  const [debateStats,setDebateStats]=useState({
    debate_count:null,
    stats:null,
  })

 useEffect(()=>{
    fetchDebateStatistics()
  },[])

  const fetchDebateStatistics=async()=>{
    try {
        const {data,status} = await getDebateStatsApi(1)
        const {stats,debate_count} = data.message;

        console.log(stats )
        setDebateStats({
        debate_count :debate_count,
          stats  
        })

    } catch (error) {
        console.log(error)      
    }
  }

  return (
    <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>DEBATES</h1>
      <div  className={styles.item_result}>
        {debateStats.stats}%
      </div>

      </div>

 <div className={styles.data}>
  {debateStats.debate_count}
 </div>
<div className={styles.item_footer}>
    <Link  to="debates">
  <p className={styles.item_link}>see all debates</p>
    </Link>
    
  <div className={styles.item_icon}>

    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/collaboration-female-male--v1.png" alt="collaboration-female-male--v1"/>

  </div>

</div>


    </div>
  )
}

export default DashboardItemDebate;