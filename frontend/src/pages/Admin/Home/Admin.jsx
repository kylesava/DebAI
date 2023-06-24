import React from 'react'
import styles from "./Home.module.css"
import ManagementBox from '../ManagementBox/ManagementBox';
const Admin = () => {
  return (
    <div className={styles.admin_home}>

        <div className={styles.admin_home_header}>

            <h1 className={styles.admin_header_text}>
                Take Control of Your Debate Platform
              </h1>
              <h1 className={styles.admin_header_text}>
                 DebAi Admin Panel </h1>

        </div>
        <ManagementBox/>
    </div>
  )
}

export default Admin;