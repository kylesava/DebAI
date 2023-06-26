import React from 'react'
import AdminForm from '../../../components/AdminForm/AdminForm'
import EditUserForm from '../../../components/AdminForm/EditUserForm/EditUserForm'
import styles from "./edituserpage.module.css"


const EditUserPage = () => {
  return (
    <div className={styles.edit_user_page}>
        <AdminForm title={"Edit user"}>
            <EditUserForm/>
        </AdminForm>
    </div>
  )
}

export default EditUserPage