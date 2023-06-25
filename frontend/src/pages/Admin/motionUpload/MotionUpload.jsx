import AdminForm from "../../../components/AdminForm/AdminForm"
import MotionForm from "../uploads/uploadMotions/MotionForm"
import UploadCatForm from "../uploads/uploadMotions/UploadCatForm"
import styles from "./upload.module.css"

const MotionUpload = () => {
  return (
    <div className={styles.upload}>

    <AdminForm title={"UPLOAD  NEW MOTIONS  CATEGORY TO DEBAI "}>
       <UploadCatForm/> 
    </AdminForm>

    <AdminForm title={"UPLOAD  NEW MOTIONS TO DEBAI "}>
        <MotionForm/>
    </AdminForm>

    </div>
  )
}

export default MotionUpload