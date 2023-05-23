import {useState ,useEffect} from "react"

import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import {HiOutlineClipboardDocument} from "react-icons/hi2";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {RxResume} from "react-icons/rx"
import "./DebateAction.css"
import { useToast } from '@chakra-ui/react';
import {TbMicroscope} from "react-icons/tb";
import {TiArrowBackOutline} from "react-icons/ti";
import {useSelector} from "react-redux"
import { getMyTeam } from "../../../utils/services";
const DebateAction = ({ 
   micMuted, 
   isUserParticipant 
   , isLive,
   WatchType,
   debateState,
   micControlTeam,
   RoomService,
  roomMembers}) => {

  const { activeDebate } = useSelector((state) => state.debate);
  const {data} = useSelector((state)=>state.user)
  const {removeInterval} = useSelector(state=>state.other)
  const toast = useToast()
  const [teams, setTeams] = useState([]);
  const [ canStartDebate,setCanStartDebate] =useState(false);
  const [ isMicWithUs,setIsMicWithUs] =useState(false)


  useEffect(() => {
    if (activeDebate?.current) {
      let speakerTeams = roomMembers.filter(speaker => {
        return activeDebate?.current.teams.some(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
      }).map(speaker => {
        let team = activeDebate?.current.teams.find(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
        return { id: speaker.id, teamName: team.name, ...speaker };
      }).reduce((acc, speaker) => {
        if (acc[speaker.teamName]) {
          acc[speaker.teamName].push(speaker);
        } else {
          acc[speaker.teamName] = [speaker];
        }
        return acc;
      }, {});




      const TeamArray = [
        {
          name: activeDebate?.current?.teams[0].name,
          members: []
        },
        {
          name: activeDebate?.current.teams[1].name,
          members: []
        }
      ]

      Object.keys(speakerTeams).forEach((team) => {
        TeamArray.forEach((teamObj) => {
          if (teamObj.name === team) {
            teamObj.members = speakerTeams[team];
          }
        })

      })
      console.log("final", TeamArray)
      setTeams(TeamArray)
    }
  }, [activeDebate?.current, roomMembers])

  useEffect(()=>{
      if(micControlTeam && data){
        const isMyTeam=   micControlTeam?.members?.find(mem => mem?._id === data?._id);
        console.log("miccontrol",isMyTeam)
        setIsMicWithUs(isMyTeam ?? false)
      }
  },[micControlTeam,data])



  useEffect(()=>{
    if(!data || !activeDebate?.current)return;
   let teamName =  getMyTeam(activeDebate?.current.teams,data._id)?.name;
   let startTeamName = activeDebate?.current.timeFormat[0].team; 
   setCanStartDebate(teamName === startTeamName)

    
  },[data,activeDebate?.current]);

  const handleCopyLink=()=>{

    toast({
      title: '',
      description: "Link copied to clipboard",
      status: 'success',
      duration: 5000,
      position: "top",
      isClosable: true,
    })
  }

  const passTurnToNextTeam=()=>{
    if(removeInterval){
     clearInterval(removeInterval.intervalRef?.current);
     removeInterval.intervalArrRef.current=[];
      RoomService.handleFinishSpeakTime(true);
    }
  }
 
const handleStartMicToggle=async()=>{
  await RoomService.handleMicTogggle()
}
const handleStartDebate=async()=>{

 await RoomService.startDebate()

}
const handleLeaveRoom=async()=>{
  try {
      await RoomService.handleLeaveRoom()
  } catch (error) {
    
  }
}

console.log(micMuted)

  return (
    <>
      <div className={"debateActionContainer"}>


        {
            isUserParticipant === null ? ".." : (isUserParticipant && isLive && WatchType === "PARTICIPANT")  ?
            <>
             {

           ( !debateState.isStarted && canStartDebate )  &&  <button className="pass_mic_button" onClick={handleStartDebate}>
              <TbMicroscope/>
              START DEBATE
            </button> 
              }
           {  (  debateState?.isPaused && isLive) &&    <button className="pass_mic_button" onClick={async()=>await RoomService.handleResumeDebate()}>
          <RxResume className="resumeIcon"/>
        RESUME DEBATE
        </button>   
}
          {
            ( !debateState.isPaused && isMicWithUs) ?  <button className="pass_mic_button" onClick={passTurnToNextTeam}>
            <TbMicroscope/>
           PASS TURN  TO NEXT TEAM 
          </button>:""
          } 
    <div className="DebateActionWrapper">
      {
   ( debateState.isStarted && !debateState.isPaused) ?    (micMuted ? <BsFillMicMuteFill onClick={handleStartMicToggle} /> :
         <BsFillMicFill className="activeMic" onClick={handleStartMicToggle} />) :""
      }
      <button className="leaveBtn" onClick={handleLeaveRoom}>
        <TiArrowBackOutline/>
        LEAVE
      </button>
    </div>
    
    </>
    :""
        }
      {
 
 (  isLive && WatchType !== "PARTICIPANT")&&
        <button className="leaveBtn leave_for_watch_type" onClick={handleLeaveRoom}>
        <TiArrowBackOutline/>
        LEAVE
      </button>
        } 
    {/* <CopyToClipboard text={`${process.env.REACT_APP_FRONTEND_URL}/debate/${activeDebate?.current?.passcode}`} onCopy={handleCopyLink}>
      <button   className="copy_link_button">
        <HiOutlineClipboardDocument/> 
        <p>COPY LINK</p>
      </button>
    </CopyToClipboard> */}
      </div>
      </>
  )
}

export default DebateAction