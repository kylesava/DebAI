import "./ParticipantsListItem.css"

const ParticipantsListItem = ({ person, selectParticipantsFunc, index }) => {
  return (
    <div className="ParticipantsItemWrapper" onClick={() => selectParticipantsFunc(person, index)}>
      <img src={person.avatar} alt="userAvatarImg" />
      <div className="details_box">
        <div className="username">{person.firstName} </div>
        <div className="email">{person.email}</div>
      </div>
    </div>
  )
}

export default ParticipantsListItem