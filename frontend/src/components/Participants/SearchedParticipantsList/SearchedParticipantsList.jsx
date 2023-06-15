import React, { useState, useEffect } from 'react'
import { searchUserByNames } from '../../../utils/Api'
import ParticipantsListItem from '../ParticipantsListItem'
import "./SearchParticipantsList.css"
import { MenuItem } from '@chakra-ui/react'




const SearchedParticipantsList = ({ searchUser, participantsSearchInput, index, handleSelectParticipants, selectedParticipants }) => {
  const [searchedParticipants, setSearchParticipants] = useState([]);
  const [isFetching, setFetching] = useState(false)


  useEffect(() => {
    handleSearchParticipants()
  }, [participantsSearchInput]);
  // useEffect(()=>{

  //  let theResult = searchedParticipants.filter((person:UserType)  =>{
  //     return selectedParticipants.every(select=>select.firstName !== person.firstName )
  //   })
  //   setSearchParticipants(theResult)


  // },[searchedParticipants])
  const handleSearchParticipants = async () => {
    try {
      setFetching(true)
      if (participantsSearchInput.length <= 0) return;
      const res = await searchUserByNames(participantsSearchInput)
      if (res.status === 200) {


        const filtered = res.data.message.filter((person) => {
          return selectedParticipants.every(select => select._id !== person._id)
        })

        setSearchParticipants(filtered)
        setFetching(false)
      } else {
        throw Error("No User found ")
      }
    } catch (error) {
      console.log(error.message)
      setFetching(false)
    }
  }


  return (
    <div className='SearchParticipantsListWrapper' style={{gap:`${searchUser ? "0px":"5px"}`}}>

      {
        participantsSearchInput.length > 0 ? isFetching ? <img style={{margin:"auto"}} width={"60px"} src="/gif/loading.gif" alt="loading" /> : searchedParticipants.map(person => (
        <ParticipantsListItem selectParticipantsFunc={handleSelectParticipants} index={index} person={person} key={person._id} />
    )) : null
      }
    </div>
  )
}

export default SearchedParticipantsList