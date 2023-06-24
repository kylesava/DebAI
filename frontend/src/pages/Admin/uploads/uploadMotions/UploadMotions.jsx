import React, { useEffect, useRef, useState } from 'react'
import { addNewMotionApi, getAllMotionCategoryApi } from '../../../../utils/Api'
import styles from "./UploadMotion.module.css"
import { DebateMotion } from '../../../../utils/data'

function UploadMotions() {
    const [types,setTypes] = useState([])
    const [formData,setFormData] =useState({
        topic:"",
        type:"",
        group:""
    })
    const intervalIdRef =useRef()
    useEffect(()=>{
        handleSubmitDemo()
    },[])

    useEffect(()=>{
        fetchTypes();
    },[])

    const handleChange=(e)=>{
        setFormData(prev=>({

            ...prev,[e.target.name]:e.target.value
        }))
    }

    const fetchTypes=async()=>{
        try {
                const {data} = await getAllMotionCategoryApi();
                setTypes(data.message)
        } catch (error) {
                console.log(error)

        }
    }



    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
                const {data}  = await addNewMotionApi(formData)
                console.log(data)
        } catch (error) {
            console.log(error) 
        }

    }


    const handleSubmitDemo=()=>{
        let i =0;
            setInterval(async() => {

            await  addNewMotionApi({
                    topic:DebateMotion.mini[i++],
                    group:"junior",
                    type:"64959dc06016610838eda7ae"
            })
            
        }, 1000);
    }




  return (
    <div >

        <form className={styles.upload_form} onSubmit={handleSubmit}>
            <input placeholder='Enter topic' type="text" name="topic" onChange={handleChange}  />
            <select name="group" onChange={handleChange}>
                <option value="" selected disabled>select group </option>
                <option value="junior">junior</option>
                <option value="senior">senior</option>

            </select>
            <select name="type" onChange={handleChange}>
                            <option value="" selected disabled>select motion type </option>
                    {
                        types.map(type=><option  key={type.name} value={type._id}>{type.name}</option>)
                    }
            </select>
            <button type='submit'>ADD MOTION</button>
        </form>
        
    </div>
  )
}

export default UploadMotions