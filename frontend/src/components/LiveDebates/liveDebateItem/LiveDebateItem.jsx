import React from 'react'
import styles from '../liveDebates.module.css'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
export const LiveDebateItem = ({debate}) => {
  return (
    <div key={debate?._id} className={styles.liveDebateItem}>
    <div>
      <h5> 💥 {debate?.topic}</h5>
      <p className={styles.started_time_ago}>
        {format(debate?.startTime)}
      </p>
    </div>
    <Link
      className={styles.joinBtnLink}
      to={`/debate/${debate?.passcode}?audience=true`}
    >
      <button className={styles.join_button}>
        <p>Join</p>
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-link-web-flaticons-lineal-color-flat-icons-8.png"
          alt="external-link-web-flaticons-lineal-color-flat-icons-8"
        />
      </button>
    </Link>
  </div>
  )
}
