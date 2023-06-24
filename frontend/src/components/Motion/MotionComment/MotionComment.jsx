import React from 'react'
import styles from "./MotionComment.module.css"

const MotionComment = ({comment}) => {
  return (
    <div className={styles.comment}>
        <div  className={styles.comment_user_box}>
            <img className={styles.comment_user_avatar} src={comment.userId.avatar} alt={`${comment.userId.firstName}'s avatar`} />

            <h1 className={styles.comment_username}>
                {comment.userId.firstName} {comment.userId.lastName}
                </h1>

        </div>
        <div className={styles.comment_info_box}>
            <p className={styles.comment_text}>{comment.comment}</p>
        </div>
    </div>
  )
}

export default MotionComment