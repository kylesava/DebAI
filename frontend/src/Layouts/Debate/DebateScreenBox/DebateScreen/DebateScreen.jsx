import React from 'react'
import NoneJoined from '../../NoneJoined/NoneJoined'
import DebatorView from '../../DebatorView/DebatorView'
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { unVoteTeamApi, voteAndUnvoteTeamApi, voteTeamApi } from '../../../../utils/Api'
import { actionCreators } from '../../../../redux/store'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import { getVoteOfTeam } from '../../../../utils/services'

const DebateScreen = ({team,activeSpeakers,teamOne,debateState}) => {
  const toast  = useToast()
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const {data} = useSelector(state=>state.user)
  const {RoomService} =useSelector(state=>state.other)
  const {activeDebate,votedTeam,isLive} = useSelector(state=>state.debate);
    const {setVotedTeamAction  ,AddActiveDebate} = bindActionCreators(actionCreators,dispatch )

 
  

  const handleVote=async()=>{

    if(!activeDebate)return;
    if(!data){
        showAlert("You need to login first !!","error")
        navigate("/login")
      return;
    }
    if(!RoomService?.debateState?.current?.isStarted){
   return  showAlert("debate has not started yet !!","error")
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
      RoomService.createChannelMessage({...updatedDebate,type:"live_vote"})
    }
  } catch (error) {
    console.log(error)   
  }
  }
 

  const showAlert=(text,type)=>{

    toast({
          title: '',
          description: text,
          status: type,
          duration: 5000,
          position: "top",
          isClosable: true,

    })
  }

  return (
    <div className={`box_wrappers ${debateState.speakTeam === team.name ? "active_screen":""}`}>
    <div className='screen_box_header'>

 <div className='screen_box_team_name_box'>
     <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/user-group-man-woman--v2.png" alt="user-group-man-woman--v2"/>  <h4 className='team_name_debate_screen teamOne'>{team?.name}</h4>
  </div>
<button className={`screen_box_vote_button  ${RoomService.AmIParticipants() ? "disable_vote_button":"" } `}onClick={handleVote}>
  <p>{getVoteOfTeam(activeDebate?.current,team?.name)} Vote </p> 
</button>
    </div>
    <div className="left_team">
      {
        team && team.members?.length > 0 ? team?.members?.map((mem) => (

          <DebatorView  activeSpeakers={activeSpeakers} debator={mem} key={mem.id} />

        )) : <NoneJoined team={team?.name} roboImg={ teamOne ?  "/images/roboTeam.png":"/images/roboTeam2.png"} /> 
      }
      
    </div>
  </div>
  )
}

export default DebateScreen