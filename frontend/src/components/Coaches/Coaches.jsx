import { coachData } from "../../utils/data"
import CoachItem from "./CoachItem/CoachItem"
import styles from "./coaches.module.css"

const Coaches = () => {
  return (
    <div className={styles.Coaches}>

    <div className={styles.coaches_header_top}>

        <div className={styles.coaches_heading_box}>
 <h1>DebAI coach</h1>
        </div>
      


    </div>
    <div  className={styles.coach_container}>
{
  coachData.map(coach=><CoachItem key={coach.name} data={coach}/>)

}
    </div>

    </div>
  )
}

export default Coaches