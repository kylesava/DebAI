import styles from "./coaches.module.css"
import {HiRectangleGroup} from "react-icons/hi2"

const Coaches = () => {
  return (
    <div className={styles.Coaches}>

    <div className={styles.coaches_header_top}>

        <div className={styles.coaches_heading_box}>
 <h1>DebAI coach</h1>
        </div>
      


    </div>
    <div  className={styles.coach_container}>

        <div className={styles.coach_box}>
          <div className={styles.coach_img_wrapper}>

            <img src="/images/coach1.png" alt="coach" />
          </div>
          <div className={styles.coach_bottom_content}>
            <p className={styles.coach_desc}> <b>Olivia : </b> Oxford graduate and DebAi coach, empowering minds with expertise.</p>
            
          
            <button className={styles.coach_hire_button}>   <HiRectangleGroup/>  Hire </button>
          </div>
        </div>
        <div className={styles.coach_box}>
        <div className={styles.coach_img_wrapper}>

<img src="/images/coach2.png" alt="coach" />
</div>
        <div className={styles.coach_bottom_content}>

            <p className={styles.coach_desc}> <b>Rachel : </b> Oxford graduate and DebAi coach, empowering minds with expertise.</p>
          
            <button className={styles.coach_hire_button}> <HiRectangleGroup/> Hire </button>
        </div>
        </div>

    </div>

    </div>
  )
}

export default Coaches