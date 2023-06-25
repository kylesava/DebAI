import { TiDeleteOutline } from "react-icons/ti";
import styles from "../../../pages/motions/motions.module.css";
import { useState } from "react";
import { deltedCatMotionApi } from "../../../utils/Api";
import useAlert from "../../../hook/useAlert";


const MotionCatItem = ({setActiveMotionCat,motion_cat,activeMotionCat,setMotionCategories}) => {

const {open} = useAlert()
const [showDelIcon,setShowDelIcon] =useState(false);
const handleShow=()=>setShowDelIcon(true)
const handleHide=()=>setShowDelIcon(false)
const handleDelete=async()=>{
    try {
            const {status} = await deltedCatMotionApi(motion_cat?._id)
            if(status===200){
                setMotionCategories(prev=>{

                    return prev.filter(cat=>cat._id !== motion_cat._id)


                })
                open({type:"success",text:"Motion category deleted successfully"})
            }
    } catch (error) {
              open({type:"error",text:"failed to delete"})
    }
}
  return (

 <div onMouseEnter={handleShow} onMouseLeave={handleHide}  onClick={()=>setActiveMotionCat(motion_cat)} className={`${styles.motion_cat_box} ${ activeMotionCat.name === motion_cat.name ? styles.active_motion_cat :""}` }>
    <TiDeleteOutline className={`${styles.delete_motion_icon} ${ showDelIcon ? styles.showDelIcon:""}`} onClick={handleDelete}/>
 <img src={motion_cat.image} alt="yin-yang"/>
  <p>{motion_cat.name}</p>
</div>  
                
                )
}

export default MotionCatItem