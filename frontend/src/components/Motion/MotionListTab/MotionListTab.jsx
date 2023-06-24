import { Accordion } from '@chakra-ui/react'
import React from 'react'
import MotionAccordian from '../MotionAccordian/MotionAccordian'
import styles from "./MotionListTab.module.css"
const MotionListTab = ({motionList,setMotion}) => {
  return (
    <div className={styles.MotionListTab}>
      
      {
        motionList.length >0 ?
          <Accordion allowToggle>


            {
              motionList.map(motion=><MotionAccordian setMotion={setMotion} key={motion._id} motion={motion}/>)

            }

        </Accordion>: <div className={styles.no_motion_box}>
           <img className={styles.no_motion_list_img} src="/images/motionList.png" alt="" />
        <h1>COULDNOT  FIND MOTION 😮</h1>        
        </div>
      } 
        </div>
  )
}

export default MotionListTab