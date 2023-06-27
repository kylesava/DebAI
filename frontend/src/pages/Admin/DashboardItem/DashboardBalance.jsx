import React from 'react'
import styles from "./dashboardItem.module.css"
const DashboardBalance = () => {
  return (

    <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>MY BALANCE</h1>
      <div  className={`${styles.item_result}`}>
        3%
      </div>

      </div>

 <div className={styles.data}>
  $1002K
 </div>
<div className={styles.item_footer}>

  <p className={styles.item_link}>see details</p>
    
  <div className={styles.item_icon}>

 <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/money-bag-bitcoin.png" alt="money-bag-bitcoin"/> 

  </div>

</div>


    </div>
    )
}

export default DashboardBalance