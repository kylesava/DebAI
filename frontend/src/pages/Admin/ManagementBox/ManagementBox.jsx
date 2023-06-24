import React from 'react'
import styles from "./ManagementBox.module.css"

const ManagementBox = () => {
  return (
    <div className={styles.management_box}>


        <div className={styles.manage}>
            <img width="64" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-debate-politics-flaticons-lineal-color-flat-icons-2.png" alt="external-debate-politics-flaticons-lineal-color-flat-icons-2"/>
            <p>Debates</p>
        </div>
                <div className={styles.manage}>
                    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/group--v1.png" alt="group--v1"/>
                    <p>Users </p>
    
        </div>
        <div className={styles.manage}>
            <img width="96" height="96" src="https://img.icons8.com/color/96/money-bag-euro.png" alt="money-bag-euro"/>
            <p>Earnings </p>
        
        </div>
        <div className={styles.manage}>
            <img width="96" height="96" src="https://img.icons8.com/fluency/96/comments.png" alt="comments"/>
            <p>Motions</p>
        </div>

    </div>
  )
}

export default ManagementBox