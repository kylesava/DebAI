import React, { useEffect, useState } from 'react'
import styles from "./dashboardItem.module.css"
import { getAccountBalanceApi } from '../../../utils/Api'
const DashboardBalance = () => {

  const [balanceStats,setBalanceStats]=useState({
    balance:null,
    pending_balance:null
  })

 useEffect(()=>{
    fetchBalance()
  },[])

  const fetchBalance=async()=>{
    try {
        const {data,status} = await getAccountBalanceApi()
        const {balance,pending_balance} = data.message;

        setBalanceStats({
          balance,
          pending_balance  
        })

    } catch (error) {
        console.log(error)      
    }
  }
  return (

    <div className={styles.dashboard_item}>

    <div  className={styles.item_header}>
      <h1  className={styles.item_name}>MY BALANCE</h1>
      <div  className={`${styles.item_result}`}>
        {/* 3% */}
      </div>

      </div>

 <div className={styles.data}>
  ${balanceStats.balance}
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