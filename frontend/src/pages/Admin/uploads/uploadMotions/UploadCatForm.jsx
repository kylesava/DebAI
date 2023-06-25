import React, { useRef, useState } from 'react'
import { addNewMotionCatApi } from '../../../../utils/Api'
import useAlert from '../../../../hook/useAlert'
import UploadService from '../../../../utils/services/Upload'
import styles from "./UploadMotion.module.css"
const UploadCatForm = () => {


    const {open} =useAlert()
    const [formData,setFormData] =useState({
        name:"",
        image:"",
        file:null
    })

    const inputRef =useRef();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!formData.file){
            return open({type:"error",text:"upload image !"})    
        }
        
        try {
            const image =    await UploadService.uploadFile(formData.file)

            delete formData.file ;
            formData.image = image;
            console.log(formData)

            const {status,data} = await  addNewMotionCatApi(formData)
            if(status===200){

                open({type:"success", text:"Motion added successfully"})
            }else{
                throw data.message 
            }

        } catch (error) {
            open({type:"error",text:"failed to add motion "})
            console.log(error)
        }



    }

    const  onChangeHandler=(e)=>{
        const {name,value}  = e.target;

        setFormData((prev)=>({
            ...prev,[name]:value
        }))
    }

  return (
    <form  className={styles.upload_form} onSubmit={handleSubmit}>

        <input onChange={onChangeHandler} placeholder=' category name' type="text" name="name" id="" required/>
        <input ref={inputRef} style={{display:"none"}} onChange={(e)=>setFormData((prev)=>({...prev,file:e.target.files[0]}))} type="file" name="image" id="" />
        <input   value={"upload image"} type='button' className={styles.upload_image_btn}  onClick={()=>inputRef.current.click()}/>
            <button type='submit' className={styles.upload_btn}>UPLOAD MOTION CATEGORY</button>


    </form>
  )
}

export default UploadCatForm