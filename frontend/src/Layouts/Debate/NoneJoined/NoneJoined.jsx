import "./NoneJoined.css"
const NoneJoined = ({ team,roboImg }) => {
    return (
        <div className='noneJoinedBox'>
            <img width={"60px"} src={roboImg} alt="teamMembers" />
        </div>
    )
}

export default NoneJoined