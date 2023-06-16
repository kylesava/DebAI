import { HiRectangleGroup } from "react-icons/hi2"
import styles from "../coaches.module.css"
import { useEffect, useState } from "react"
import { getFlag } from "../../../utils/services"

const CoachItem = ({data}) => {

    const [flag,setFlag] =useState("")

    useEffect(()=>{

      async function getFlagfunc(){

         setFlag( await getFlag(data.country))
      }
      getFlagfunc()
    },[data])

  return (
    <div className={styles.coach_box}>
    <div className={styles.coach_img_wrapper}>

      <img src={data.image} alt="coach" />
    </div>
    <div className={styles.coach_bottom_content}>
      <div className={styles.coach_country_box}>
        
        <p>{data.country}</p>
        <img className={styles.coach_country_flag} src={flag} alt={data.country} />
        </div>

      <p className={styles.coach_desc}> <b>{data.name} : </b> {data.desc}</p>
      
    
      <button className={styles.coach_hire_button}>   <HiRectangleGroup/>  Hire </button>
    </div>
  </div>
  )
}

export default CoachItem