import styles from "./adminForm.module.css"

const AdminForm = ({children ,title}) => {
  return (
    <div className={styles.admin_form}>
        <div  className={styles.form_header}>

            <h1 className={styles.form_header_text}>
              {title}
             </h1> 


        </div>
        <div className={styles.form_box}>
                {children}
        </div>
    </div>
  )
}

export default AdminForm