import styles from "./User.module.css"
const User = ({user}) => {
  return (
    <div className={styles.top_user}>
        <div className={styles.main_info}>

        <img referrerPolicy="no-referrer" className={styles.top_user_avatar} src={user.avatar} alt={`${user.firstName}'s avatar`} />
        <div>
        <p className={styles.top_username}>{user.firstName} {user.lastName}</p>
        <p className={styles.top_email}>{user.email}</p>
        </div>

        </div>
        <div className={styles.points_box}>
        <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/popular-topic.png" alt="popular-topic"/>
        <p>{user.points}</p>
        </div>

    </div>
  )
}

export default User