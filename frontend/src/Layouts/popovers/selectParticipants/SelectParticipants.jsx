import React, { useEffect } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react'
import SearchedParticipantsList from '../../../components/Participants/SearchedParticipantsList/SearchedParticipantsList';


const SelectParticipants = ({index,handleSelectParticipants,selectedParticipants, participantsSearchInput,team}) => {
  
    const {isOpen,onClose,onOpen} = useDisclosure();

    useEffect(()=>{
        onOpen()
    },[participantsSearchInput])

  


  return (
<Menu  isOpen={isOpen}  onClose={onClose} >
  {/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Actions
  </MenuButton> */}
  
  <MenuList padding={0}>
    <SearchedParticipantsList searchUser={true} team={team} index={index} handleSelectParticipants={handleSelectParticipants} selectedParticipants={team?.members} participantsSearchInput={participantsSearchInput}/>
  </MenuList>
</Menu>  )
}

export default SelectParticipants