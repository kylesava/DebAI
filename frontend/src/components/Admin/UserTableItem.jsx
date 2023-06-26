import {BiMessageSquareEdit} from "react-icons/bi"
import {MdOutlineDelete} from "react-icons/md"
import {
  Tr,
  Td,
} from '@chakra-ui/react'
import styles from "./usertable.module.css"
const UserTableItem = ({user}) => {
  return (
          <Tr>
                  <Td> {user._id}</Td>
                  <Td>{user.firstName} {user.lastName}</Td>
                  <Td> {user.email}</Td>
                  <Td>{user.verified.toString()}</Td>
                  <Td>{user.points}</Td>
                  <Td> {user.country}</Td>
                  <Td><div className={styles.action_btns}> 
                    <MdOutlineDelete className={styles.deleteIcon}/>
                    <BiMessageSquareEdit className={styles.editIcon}/>
                    </div></Td>
                </Tr>
  )
}

export default UserTableItem