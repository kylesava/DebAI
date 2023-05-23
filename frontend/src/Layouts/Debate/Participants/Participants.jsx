import React, { useEffect, useState } from 'react'
import "./Participants.css"
import { useSelector } from 'react-redux';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import ParticipantPerson from '../../../components/DebateRoom/participantPerson/ParticipantPerson';

const Participants = () => {
  const { activeDebate } = useSelector((state) => state.debate);

  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    if (!activeDebate?.current) return;
    let result = activeDebate?.current?.teams?.reduce((acc, team) => {
      team.members.forEach((person) => {
        acc.push(person)
      })
      return acc
    }, [])
    setParticipants(result)


  }, [activeDebate?.current])


  return (
    <div className='participantsWrapper'>

      <div className='participatants_header'>
        {
          participants && <>
            <p>Participants</p>
            <AvatarGroup size='md' max={participants?.length - 1}>
              {
                participants ? participants.map((participant) => (
                  <Avatar key={participant?._id} referrerPolicy="no-referrer" className="avatars" name={participant.firstName} src={participant.avatar} />
                )) : ""
              }
            </AvatarGroup>
          </>
        }



      </div>
      <div className='participation_person_list'>
        {
          participants ? participants?.map(participant => (
            <ParticipantPerson key={participant._id} person={participant} />

          )) : <div className='loading'></div>

        }


      </div>
    </div>
  )
}

export default Participants