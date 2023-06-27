import { useParams } from "react-router-dom"
import styles from "../EditUserForm/EditUserForm.module.css"
import { useEffect, useState } from "react"
import { getDebateByIdApi } from "../../../utils/Api"
import { Enums } from "../../../redux/action/actionTypes/Enumss"
import { debateFormat } from "../../../utils/data"


const EditDebateForm = () => {
    const [debate,setDebate]  =useState({})
    const [debateData,setDebateData]=useState({
        topic:"",
        passcode:"",
        startTime:"",
        judgeType:"",
        type:"",
        teams:[
            {name:"",members:[]},
            {name:"",members:[] }
        ]
    })
    const {id} = useParams()

    useEffect(()=>{
        if(!id)return;
        fetchDebateToEdit()
    },[id])


    useEffect(()=>{
      if(!debate._id)return;

      Object.entries(debate).forEach(([key1,value1])=>{
        Object.entries(debateData).forEach(([key,value])=>{
          if(key===key1){
            setDebateData(prev=>({
              ...prev,[key1]:value1
            }))
          }
        })
      })

    },[debate])
    


    const fetchDebateToEdit=async()=>{

        const {data,status}= await getDebateByIdApi(id)
        if(status===200){
            setDebate(data.message[0])
         }

    }
    const handleChangeInput=(event)=>{
      const {value,name}=event.target;

      setUserData(prev=>({
        ...prev,[name]:value
      }))

    }

const handleEdit=async(e)=>{
      e.preventDefault()
        try {
            const {status,data}= await updateUserapi(id,userData)
            if(status===200){
              open({type:"success",text:"user updated successfully"})
              setUser(data.message)

            }else{
              throw "something went wrong"
            }
        } catch (error) {
          open({type:"error",text:"failed to update user"})
        }
    }


  return (
  <form onSubmit={handleEdit} className={styles.edit_debate_page} >

<div className={styles.input_item}>

      <input type="text" name="topic" id=""  placeholder='topic'  onChange={handleChangeInput} value={debateData.topic}/>
</div>
<div className={styles.input_item}>

      <input type="number" name="passcode" id="" placeholder='lastName'  onChange={handleChangeInput}value={debateData.passcode} />
</div>


<div className={styles.input_item}>
  
       <select value={debateData.judgeType}  name='judgeType' className='team_format' onChange={handleInputChange}>
          <option value={""} disabled selected >Choose Judge Type</option>
          <option value={`${Enums.AIJUDGE}`}>AI Judge</option>
          <option value={`${Enums.VOTING}`}>Voting</option>
          <option value={`${Enums.NOJUDGE}`}>No Judge </option>
          </select>
</div>
<div className={styles.input_item}>
  
   <select  name='type'  value={debateData?.type} onChange={handleChangeInput}>
      
          <option selected disabled value={""}>choose debate type</option>
         
               {Array.from(debateFormat).map(([debateType]) => (
          <option  value={debateType} key={debateType}>{debateType}</option>
        ))}

        </select>
</div>


<button type="submit" className={styles.update_button}>UPDATE</button>
      

    </form>
  )
}

export default EditDebateForm