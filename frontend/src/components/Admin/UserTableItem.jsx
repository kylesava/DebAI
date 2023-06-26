import {BiMessageSquareEdit} from "react-icons/bi"
import {MdOutlineDelete} from "react-icons/md"
import {Link} from "react-router-dom"
import {
  Tr,
  Td,
  
} from '@chakra-ui/react'
import styles from "./usertable.module.css"
import { deleteUserApi } from "../../utils/Api"
import useAlert from "../../hook/useAlert"
const UserTableItem = ({user ,setAllUsers}) => {



  const {open} =useAlert()
  const handleDeleteUser=async(userId )=>{

    try {

     const {status}  =await deleteUserApi(userId);
     
     if(status===200){
      open({type:"success",text:"user deleted successfully"})
      setAllUsers(prev=>{
        return prev.filter(user=>user._id !==userId)
      })
     }else{
      throw "something went wrong "
     }
    } catch (error) {
      open({type:"error",text:"failed to delete user"})
    }

  }

  return (
          <Tr>
                  <Td> {user._id}</Td>
                  <Td>{user.firstName} {user.lastName}</Td>
                  <Td> {user.email}</Td>
                  <Td>{user.verified.toString()}</Td>
                  <Td>{user.points}</Td>
                  <Td> {user.country}</Td>
                  <Td>
                    <div className={styles.action_btns}> 
                    <MdOutlineDelete
                     className={styles.deleteIcon}
                     onClick={()=>handleDeleteUser(user._id)}
                     />
                    <Link to={`edit/${user._id}`}>
                    
                      <BiMessageSquareEdit className={styles.editIcon}/>
                    </Link> 
                    </div>
                    </Td>

                </Tr>
  )
}

export default UserTableItem