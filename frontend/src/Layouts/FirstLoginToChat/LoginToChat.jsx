import styles from "./LoginToChat.module.css"
import {useNavigate} from "react-router-dom"

const LoginToChat = () => {
  const navigate =useNavigate()
  return (
    <div className={styles.loginToChatWrapper}>
      <p className={styles.theText}>You need to login inorder to livechat...</p>
      <button  onClick={()=>navigate("/login")}>Login Now</button>
    </div>
  )
}

export default LoginToChat