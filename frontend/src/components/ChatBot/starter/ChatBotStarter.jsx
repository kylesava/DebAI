import styles from "./ChatBotStarter.module.css"
const ChatBotStarter = () => {
  return (
    <div className={styles.chatBotWrapper} >
            <img draggable="false" src="/images/chatBot.jpg" alt="chatBotImg" />
            <div className={styles.chat_bot_content}>

            <h4 className={styles.main_text_chat_bot} >Ask anything with chat bot</h4>
            <p className={styles.secondary_text_chat_bot}>Made with openAi</p>
            </div>
    </div>
  )
}

export default ChatBotStarter