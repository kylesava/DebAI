import "./NoneJoined.css"
const NoneJoined = ({ team }) => {
    return (
        <div className='noneJoinedBox'>
            <img src="/images/error_dino.png" alt="redDino" />
            <h5 className="no_one_joinedtext">No one joined the {team?.name}</h5>
        </div>
    )
}

export default NoneJoined