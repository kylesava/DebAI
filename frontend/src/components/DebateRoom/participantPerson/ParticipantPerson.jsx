import UserProfile from "../../../Layouts/popovers/viewprofile/UserProfile"
import "./ParticipationPerson.css"

const ParticipantPerson = ({ person }) => {
  return (
    <UserProfile userId={person?._id}>

      <div className='ParticipantsPersonWrapper'>
        <img className='participation_person_img' referrerPolicy="no-referrer" src={person?.avatar} alt='userImg' />
        <p>
          {person?.firstName}
        </p>
      </div>
    </UserProfile>
  )
}

export default ParticipantPerson