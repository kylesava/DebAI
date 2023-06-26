import { useParams } from 'react-router-dom'
import styles from './EditUserForm.module.css'
import { getCountries, searchUserByIdApi, updateUserapi } from '../../../utils/Api'
import { useEffect, useState } from 'react'
import { DebAiCountriesList } from '../../../utils/data'
import useAlert from '../../../hook/useAlert'


const EditUserForm = () => {

    const {id} = useParams()
    const [user,setUser] =useState({});
    const [countryList,setCountryList] =useState([])
    const {open} = useAlert()

    const [userData,setUserData] =useState({
      firstName:"",
      lastName:"",
      verified:null,
      email:"",
      country:"",
      points:""

    })

    useEffect(()=>{
        if(!id)return;
            fetchUserToEdit()
    },[id])


    useEffect(()=>{
      if(!user._id)return;

      Object.entries(user).forEach(([key1,value1])=>{
        Object.entries(userData).forEach(([key,value])=>{
          if(key===key1){

            setUserData(prev=>({
              ...prev,[key1]:value1
            }))

          }
        })
      })

    },[user])
    
    useEffect(()=>{
      handleGetCountries()
    },[DebAiCountriesList])
    const fetchUserToEdit=async()=>{

        const {data,status}= await searchUserByIdApi(id)
        if(status===200){
            setUser(data.message[0])
         }

    }
  console.log(userData)
    const handleChangeInput=(event)=>{
      const {value,name}=event.target;

      setUserData(prev=>({
        ...prev,[name]:value
      }))

    }



const handleGetCountries=async()=>{

  try {
      const {data,status} = await getCountries()
      if(status!==200)return;
      const filterdCountries = data.filter(count=>DebAiCountriesList.find(name=>{
            return name=== count?.name?.common
      })) 

      setCountryList(filterdCountries);
      // console.log(data[33].name?.common)
  } catch (error) {
    console.log(error)
  }
}

    const handleCheckBoxChange=(e)=>{
      setUserData(prev=>({
        ...prev,"verified":  e.target.checked
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
    <form onSubmit={handleEdit} className={styles.edit_user_form} >

<div className={styles.input_item}>

      <input type="text" name="firstName" id=""  placeholder='firstName'  onChange={handleChangeInput} value={userData.firstName}/>
</div>
<div className={styles.input_item}>

      <input type="text" name="lastName" id="" placeholder='lastName'  onChange={handleChangeInput}value={userData.lastName} />
</div>
<div className={styles.input_item}>

      <input type="email" name="email" id=""  placeholder='email address'  onChange={handleChangeInput}value={userData.email}/>
</div>
<div className={styles.input_item}>

      <input type="number" name="points" id=""  placeholder='points' onChange={handleChangeInput} value={userData.points}/>
</div>
<div className={styles.input_item}>
  
  <select name="country" value={userData.country} onChange={handleChangeInput}>
    {
      countryList.map(country=><option   value={country.name.common} >{country.name.common}</option>)
    }
    </select>
</div>
<div className={styles.normal_item} >
  <label htmlFor="" className={styles.label}>Verified</label>
  <input type="checkbox" name="verified" id="" checked={userData.verified} className={styles.check_box_input}  onChange={handleCheckBoxChange} />
</div>


<button type="submit" className={styles.update_button}>UPDATE</button>
      

    </form>
  )
}

export default EditUserForm