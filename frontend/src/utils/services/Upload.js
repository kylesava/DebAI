import axios from "axios"

const cloudName ="onlinecoder"
const presetKey="imgVariation"


class UploadService{

    static  async uploadFile(file){

    const formData = new FormData()
    formData.append("file",file)
    formData.append("upload_preset",presetKey)

    try {
    const res = await  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      onUploadProgress:e=>{
        console.log(e.loaded)
      }
    })

    return res?.data?.secure_url;

  } catch (error) {
    console.log(error)
  }

    }
}
export default UploadService