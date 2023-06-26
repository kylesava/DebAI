import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getAllDebaiUsersApi } from '../../utils/Api'
import UserTableItem from './UserTableItem'
const UserTable = () => {

    const [debAiUsers,setDebAiUsers] =useState([])
    const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(15)



    useEffect(()=>{
        fetchDebAiUsers()
    },[ ])

    const fetchDebAiUsers=async()=>{
        try {
                const {data,status} = await getAllDebaiUsersApi()
                if(status===200){
                    setDebAiUsers(data.message)
                }else{
                    throw data.message
                }
        } catch (error) {
                console.log(error)
        }   
    }


  return (
    <TableContainer>
  <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Username</Th>
        <Th>Email</Th>
        <Th>Verfied</Th>
        <Th isNumeric>Points</Th>
        <Th>Country</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            debAiUsers.map(user=><UserTableItem  setAllUsers={setDebAiUsers} user={user} key={user._id}/>)
        }
    </Tbody>

  </Table>
</TableContainer>
  )
}

export default UserTable