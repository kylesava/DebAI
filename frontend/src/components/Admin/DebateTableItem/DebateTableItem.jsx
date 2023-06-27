import {BiMessageSquareEdit} from "react-icons/bi"
import {MdOutlineDelete} from "react-icons/md"
import {Link} from "react-router-dom"
import {
  Tr,
  Td,
  
} from '@chakra-ui/react'
import styles from "../usertable.module.css"
import { deleteDebateApi } from "../../../utils/Api"
import useAlert from "../../../hook/useAlert"

const DebateTableItem = ({debate ,setDebaiDebate}) => {



  const {open} =useAlert()
  const handleDeleteUser=async(debateId )=>{

    try {

     const {status}  =await deleteDebateApi(debateId);
     
     if(status===200){
      open({type:"success",text:"Debate deleted successfully"})
      setDebaiDebate(prev=>{
        return prev.filter(debate=>debate._id !==debateId)
      })
     }else{
      throw "something went wrong "
     }
    } catch (error) {
      open({type:"error",text:"failed to delete debate"})
    }

  }

  return (
          <Tr>
                  <Td> {debate._id}</Td>
                  <Td>{debate.topic.substring(0,14)} </Td>
                  <Td> {debate.type}</Td>
                  <Td>{debate.judgeType}</Td>
                  <Td>{debate.passcode}</Td>
                  <Td> {debate.startTime}</Td>
                  <Td>{debate.teams[0].name}/{debate.teams[1].name}</Td>
                  <Td>
                    <div className={styles.action_btns}> 
                    <MdOutlineDelete
                     className={styles.deleteIcon}
                     onClick={()=>handleDeleteUser(debate._id)}
                     />
                    <Link to={`edit/${debate._id}`}>
                    
                      <BiMessageSquareEdit className={styles.editIcon}/>
                    </Link> 
                    </div>
                    </Td>

                </Tr>
  )
}

export default DebateTableItem