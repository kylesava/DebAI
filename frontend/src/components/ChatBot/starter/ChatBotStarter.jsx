import styles from "./ChatBotStarter.module.css"
const ChatBotStarter = () => {
  return (
    <div className={styles.chatBotWrapper} >
            <div className={styles.chat_bot_content}>

            <h4 className={styles.main_text_chat_bot} >Ask anything with chat bot</h4>
            {/* <p className={styles.secondary_text_chat_bot}>Made with openAi</p> */}
            </div>
      <div className={styles.chatBotImages}>

            <img draggable="false" src="/images/bot3.png" alt="chatBotImg" />
              <img draggable="false" src="/images/bot2.png" alt="chatBotImg" />

      </div>
    </div>
  )
}

export default ChatBotStarter