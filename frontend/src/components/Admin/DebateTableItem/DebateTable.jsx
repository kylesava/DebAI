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

import { getDebateByTimeApi } from '../../../utils/Api'
import DebateTableItem from './DebateTableItem'
const DebateTable = ({debateType}) => {

    const [debAiDebates,setDebAiDebates] =useState([])
    const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(15)



    useEffect(()=>{
        fetchDebAiDebates()
    },[ debateType])

    const fetchDebAiDebates=async()=>{
        try {
                const {data,status} = await getDebateByTimeApi(debateType);
                if(status===200){
                    setDebAiDebates(data.message)
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
        <Th>Topic</Th>
        <Th>Type</Th>
        <Th>Judge Type</Th>
        <Th isNumeric> Passcode</Th>
        <Th>Starts At</Th>
        <Th>Teams Name</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            debAiDebates
            .map(debate=><DebateTableItem setDebaiDebate={setDebAiDebates} debate={debate} key={debate._id}/>)
        }
    </Tbody>

  </Table>
</TableContainer>
  )
}

export default DebateTable