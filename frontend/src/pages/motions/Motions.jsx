import React, { useEffect, useState } from 'react'
import styles from "./motions.module.css"
import Navbar from "../../Layouts/Navbar/Navbar"
import { getAllMotionCategoryApi, getMotionOfType } from '../../utils/Api'
const Motions = () => {


const [motionPerson,setMotionPerson] =useState("senior")
const [activeMotionCat,setActiveMotionCat] =useState({})
const [motionCategories,setMotionCategories] = useState([]);
const [allMotions,setAllMotions] =useState([])




useEffect(()=>{

},[activeMotionCat])

useEffect(()=>{


    fetchDebateCategory()



},[]);

useEffect(()=>{
fetchMotionsOfType()
},[activeMotionCat])

const fetchMotionsOfType=async()=>{
    if(!activeMotionCat?._id)return;
    try {
            const {status,data} =await getMotionOfType(activeMotionCat._id)
            setAllMotions(data.message)
    } catch (error) {
            console.log(error)
    }
}

const fetchDebateCategory=async()=>{
    try {
    const  res = await getAllMotionCategoryApi();
    if(res.status===200){
        setMotionCategories(res.data.message);
        setActiveMotionCat(res.data.message[0])
    }
    } catch (error) {
        console.log(error)
    }
}

console.log(motionCategories)


  return (
    <div className={styles.motion_page}>

        <Navbar/>
        <div className={styles.motion_container}>

            <div className={styles.motion_header}>

                <h1 className={styles.motion_header_text}>Unlock the Power of Persuasion with Our Debate Motion Collection</h1>
                <p className={styles.motion_header_desc}>Explore our extensive collection of debate motions, share your thoughts, and engage in lively discussions with fellow debaters</p>

            </div>

            <div className={styles.motion_button_container}>
                <button className={`${styles.button_tab} ${styles.active_tab} `}>
                    <img width="48" height="48" src="https://img.icons8.com/emoji/48/older-person-medium-light-skin-tone.png" alt="older-person-medium-light-skin-tone"/>
                    <p>Senior</p></button>
                <button className={styles.button_tab}>

                <img width="48" height="48" src="https://img.icons8.com/emoji/48/boy-light-skin-tone.png" alt="boy-light-skin-tone"/>
                <p>Junior</p>
                </button>
            </div>
            <div className={styles.motion_category_wrapper}>


        {
            motionCategories.map(motion_cat=>(

                        <div onClick={()=>setActiveMotionCat(motion_cat)} className={styles.motion_cat_box}>

                    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/yin-yang.png" alt="yin-yang"/>
                    <p>{motion_cat.name}</p>
                </div>

            ))
        }

            </div>

        </div>


    </div>
  )
}

export default Motions
//                                  <div className={styles.motion_cat_box}>

//               {/* <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/recycle-sign.png" alt="recycle-sign"/> */}
//                     <p>Environment</p>
//                 </div>
//                                  <div className={styles.motion_cat_box}>

// {/* <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/mind-map.png" alt="mind-map"/>                    <p>Current Affairs</p> */}
//                 </div>
//                                  <div className={styles.motion_cat_box}>

//                     {/* <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/knowledge-sharing.png" alt="knowledge-sharing"/> */}
//                     <p>Mini</p>
//                 </div>