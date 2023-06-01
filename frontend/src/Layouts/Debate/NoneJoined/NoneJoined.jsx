import "./NoneJoined.css"
const NoneJoined = ({ team,roboImg }) => {
    return (
        <div className='noneJoinedBox'>
            <h5 className="no_one_joinedtext"> {team?.name}</h5>
        </div>
    )
}

export default NoneJoined