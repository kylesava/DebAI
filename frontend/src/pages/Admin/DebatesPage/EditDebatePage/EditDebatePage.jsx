import React from 'react'
import AdminForm from '../../../../components/AdminForm/AdminForm'
import EditDebateForm from '../../../../components/AdminForm/EditDebateForm/EditDebateForm'

const EditDebatePage = () => {
  return (
    <div className={styles.edit_debate_page}>


        <AdminForm title={"Edit Debate"}>

            <EditDebateForm/>

        </AdminForm>

    </div>
  )
}

export default EditDebatePage