import React, { useEffect, useState } from 'react';
import { getAllMotionCategoryApi, uploadMotionFileApi } from '../../../utils/Api';
import styles from './motionFileForm.module.css'



const DebateTopicUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryType,setCategoryType]=useState([]);
  const [uploadData,setUploadData] =useState({
    type:"",
    group:""
  })

  useEffect(()=>{
fetchAllCat()
  },[])

  const fetchAllCat=async()=>{
    try {
        const {data,status} = await getAllMotionCategoryApi()
        if(status===200){
          setCategoryType(data.message )

        }

    } catch (error) {
      
    } 
  }

  const handleInputChange=e=>{
    const {name,value}= e.target;

    setUploadData(prev=>({
      ...prev,[name]:value
    }))
  }

  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {group,type} = uploadData;

    if(!selectedFile || !group || !type){
      alert("fill all details");
      return ;
    }
    const formData = new FormData();
    formData.append('debateTopics', selectedFile);
    formData.append('type',type);
    formData.append('group',group);




    try {
    const options = {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }
    const {status} = await uploadMotionFileApi(formData,options)
    if(status===200){
      alert("succesfulyy added")
      console.log('Topics uploaded successfully');
    }else{
      throw "something went wrong"
    }

    } catch (error) {
  alert("something went wrong try again please")      
      console.error('Error uploading topics:', error);
      
    }
  };
   return (
    <div className={styles.motion_upload}>
      <div className={styles.upload_content}>

      <div className={styles.motion_upload_header}>

      <h2 className={styles.upload_main_text}>Upload Motion File</h2>

      <p className={styles.upload_warning_text}>Note : upload the txt file .  Each motion should be in one line . There should not be   empty line </p>
      </div>
      <form className={styles.upload_form} onSubmit={handleSubmit}>
        <select required name="type" onChange={handleInputChange} >
          <option value="">choose category</option>
          {
            categoryType.map(cat=><option value={cat._id}>{cat.name}</option>)
          }
        </select>
        <select required name="group" onChange={handleInputChange} >
          <option value="" selected disabled>choose group</option>
          <option value="senior">senior</option>
          <option value="junior">junior</option>
        </select>
          <input type="file" accept=".txt" onChange={handleFileChange} />
        <button className={styles.upload_button} type="submit">Upload</button>
      </form>
          </div>
    </div>
  );
};

export default DebateTopicUploader;
