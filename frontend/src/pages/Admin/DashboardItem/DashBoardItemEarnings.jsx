import styles from "./dashboardItem.module.css"
const DashBoardItemEarnings = () => {
  return (
  <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>EARNINGS</h1>
      <div  className={styles.item_result}>
        +22%
      </div>

      </div>

 <div className={styles.data}>
  $442K
 </div>
<div className={styles.item_footer}>

  <p className={styles.item_link}>see all earnings</p>
    
  <div className={styles.item_icon}>
    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/coins.png" alt="coins"/>
  </div>

</div>


    </div>
  )
}

export default DashBoardItemEarnings