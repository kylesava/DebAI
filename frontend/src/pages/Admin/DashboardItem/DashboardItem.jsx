import React from 'react'
import styles from "./dashboardItem.module.css"
import {Link} from 'react-router-dom'
const DashboardItem = () => {
  return (
    <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>USERS</h1>
      <div  className={`${styles.item_result} ${styles.loss}`}>
        -5%
      </div>

      </div>

 <div className={styles.data}>
  460
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