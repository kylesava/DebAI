import UserTable from "../../../components/Admin/UserTable"
import styles from "./userpage.module.css"
const UsersPage = () => {
  return (
    <div className={styles.user_page}>

        <div className={styles.user_page_header}>
          <h1 className={styles.user_header_text}>MANAGE USERS OF  DEBAI</h1>
        </div>
        <div className={styles.users_container}>
          <UserTable/>

        </div>






    </div>
  )
}

export default UsersPage