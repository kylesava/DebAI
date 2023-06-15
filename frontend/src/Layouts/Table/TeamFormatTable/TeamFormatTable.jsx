import React from 'react'
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

const TeamFormatTable = ({debateForm ,handleSpeakTimeChange}) => {
  return (
    <TableContainer>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Speech Round</Th>
          <Th>Speech Team</Th>
          <Th isNumeric>Speech Time </Th>
        </Tr>
      </Thead>
      <Tbody>
        {
debateForm.timeFormat.map((format,index)=>(

    <Tr key={index}     >
          <Td color={'gray.700'}>{index +1}</Td>
          <Td color={'gray.700'}>{format.team}</Td>
          <Td padding={"8px"} textAlign={"end"}>
            <input  className='speak_time_input'  onChange={(e)=>handleSpeakTimeChange(e,index)} type="number" name=""value={format?.time} id="" />
          </Td>
        </Tr>
          ))
        }
     
      </Tbody>
   
    </Table>
  </TableContainer>
  )
}

export default TeamFormatTable