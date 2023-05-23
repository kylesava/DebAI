import "./DebateTeam.css"
import { BiUpvote } from "react-icons/bi"
import ParticipantPerson from '../../../components/DebateRoom/participantPerson/ParticipantPerson'
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/store"
import { unVoteTeamApi, voteAndUnvoteTeamApi, voteTeamApi } from "../../../utils/Api"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Enums } from "../../../redux/action/actionTypes/Enumss"

const DebateTeam = ({  team }) => {
  const { isLive, votedTeam ,activeDebate} =useSelector(state=>state.debate);
  const {data} =useSelector(state=>state.user)
  const {rtmChannel ,RoomService} =useSelector(state=>state.other)
  const navigate = useNavigate()
  const dispatch =useDispatch( )
  const {setVotedTeamAction  ,AddActiveDebate} = bindActionCreators(actionCreators,dispatch )
  const toast =useToast();
  


  const handleVote=async()=>{

    if(!activeDebate)return;
    if(!data){
      toast({
        title: '',
        description: "You need to sign in to vote",
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      navigate("/login")
      return;
    }
    if(!isLive){
   return   toast({
          title: '',
          description: "Cannot vote debate has not started   ",
          status: 'error',
          duration: 5000,
          position: "top",
          isClosable: true,
        })
    }

    let payload = {
      user:data?._id,
      team:team.name,
      debate:activeDebate?.current?._id  
    }
  
    try {
      let updatedDebate ;
    if(votedTeam){
      if(team.name === votedTeam){
      let res =  await unVoteTeamApi(payload)
      updatedDebate = res.data.message
      setVotedTeamAction(null)
      }else{
        // vote and unvote
        delete payload.team;
        payload.voteTeam = team.name;
        payload.unVoteTeam = votedTeam ;
        const res =  await voteAndUnvoteTeamApi(payload);
        updatedDebate = res.data.message
        setVotedTeamAction(team.name)
      }
    }else{
      // vote the team 
     const res =  await voteTeamApi(payload);
      updatedDebate = res.data.message;
      setVotedTeamAction(team.name)
    }
    activeDebate.current = updatedDebate
    AddActiveDebate(activeDebate)
    if(RoomService){
      // r({text:JSON.stringify({...updatedDebate,type:"live_vote"})})
      console.log("voting",RoomService  )
      RoomService.createChannelMessage({...updatedDebate,type:"live_vote"})
    }
  } catch (error) {
    console.log(error)   
  }
  }
 

  return (
    <div className='debateTeamWrapper'>
      <div className='team_header_info'>
        <h2 className='team_name'>{team.name}</h2>
        <div className='vote_box'>
          <div className='vote_count'>
          </div>
          {
           activeDebate?.judgeType===Enums.VOTING &&  <button 
            onClick={handleVote}
            className={`vote_button ${team?.name === votedTeam ? "voted":"" } ${(!isLive || !data) &&"disabled_vote_button"} ${RoomService.AmIParticipants() && "disable_vote"}`}>
            <BiUpvote />
            <p>{team.vote.length}</p>
            <p>VOTE</p>
          </button>
              }
        </div>
      </div>
      <div className='team_member_list'>
        {
          team.members.map(person => (
            <ParticipantPerson person={person} key={person._id} />

          ))
        }
      </div>


    </div>
  )
}

export default DebateTeam

