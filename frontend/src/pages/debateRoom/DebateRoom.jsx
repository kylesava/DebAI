import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect, useLayoutEffect, useState, useRef } from "react"
import DebateScreenBox from "../../Layouts/Debate/DebateScreenBox/DebateScreenBox"
import { useToast } from '@chakra-ui/react';
import Participants from "../../Layouts/Debate/Participants/Participants"
import Navbar from "../../Layouts/Navbar/Navbar"
import LiveChat from "../../components/DebateRoom/LiveChat/LiveChat"
import { json, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getAgoraTokenApi, getDebateByPassocde, joinParticipantApi, removeParticipantApi } from "../../utils/Api"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../redux/store"
import { DebateRoomServices, getTimeCountDown, getTimeFromMs } from "../../utils/services"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import AgoraRTM from 'agora-rtm-sdk'
import AgoraRTC from 'agora-rtc-sdk-ng'
import DebateAction from "../../components/DebateRoom/DebateAction/DebateAction"
import "./DebateRoom.css"
import DebateInfo from "../../Layouts/Debate/DebateInfo/DebateInfo";
import AnalyzeResultModal from '../../Layouts/modal/DebateFinishedModal/AnalyzingResult';
const APPID = process.env.REACT_APP_AGORA_APP_ID;
const Rtm_client = AgoraRTM.createInstance(APPID);
const Rtc_client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
const rtcUid = Math.floor(Math.random() * 2032)
export { Rtm_client, Rtc_client }

const DebateRoom = () => {
  const { activeDebate, isLive, isUserParticipant, roomLoading } = useSelector((state) => state.debate);
  const { data } = useSelector(state => state.user)
  const otherState = useSelector(state => state.other)
  const [UrlSearchParams, setUrlSearchParams] = useSearchParams();
  const [WatchType, setWatchType] = useState()
  let { debateId } = useParams()
  debateId = debateId.toString()
  const dispatch = useDispatch()
  const rtmChannelRef = useRef()
  const { AddActiveDebate, addLiveMessages, SetRoomIsLiveOrNot, SetIsUserParticipant, setRtmChannelAction, setIsLoading, SetRoomLoading ,setRoomService } = bindActionCreators(actionCreators, dispatch)
  const [activeMicControlTeam, setActiveMicControlTeam] = useState(null)
  const [audioTracks, setAudioTracks] = useState({
    localAudioTracks: null,
    remoteAudioTracks: {}
  })
  const toast = useToast();
  const navigate = useNavigate()
  const debateStateRef = useRef()
  const activeDebateRef = useRef()
  const timeRemainingRef = useRef()
  const [micMuted, setMicMuted] = useState(true)
  const [RoomMembers, setRoomMembers] = useState([]);
  const [activeSpeakers, setActiveSpeakers] = useState([]);
  const [startAnalyze,setStartAnalyze] =useState(false)
  const lastApiCallConfig= useRef({
    admin:null,
    hasApiCalled:false,
    startApiCalled:false,
  })
  const [debateState, setDebateState] = useState({
    round_shot: 0,
    speakTime: 0,
    speakTeam: "",
    isStarted: false,
    hasFinished: false,
    changedAt: 0,
    startedAt: 0,
    isPaused: false,
    both: false,
    remainingTime: 0,

  })
  const showToast = (message, type) => {
    toast({
      title: '',
      description: message,
      status: type,
      duration: 5000,
      position: "top",
      isClosable: true,
    })

  }
  const hasLeftRoom = useRef(false)
  const {transcript,resetTranscript} = useSpeechRecognition()
  const RoomService = new DebateRoomServices({
    data,
    isLive,
    rtcUid,
    navigate,
    hasLeftRoom,
    debateId,
    micMuted,
    showToast,
    otherState,
    addLiveMessages,
    audioTracks,
    RoomMembers,
    transcript,
    resetTranscript,
    setMicMuted,
    rtmChannelRef,
    activeSpeakers,
    setDebateState,
    setRoomMembers,
    debateStateRef,
    AddActiveDebate,
    activeDebateRef,
    timeRemainingRef,
    lastApiCallConfig,
    setActiveSpeakers,
    setRtmChannelAction,
    activeMicControlTeam,
    setActiveMicControlTeam,
    setRoomLoading:SetRoomLoading,
    isAudience: UrlSearchParams.get("audience"),
  });

  const [handleRemaining, setHandleRemaining] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  })

  useEffect(()=>{
    setRoomService(RoomService)
  },[])
  useEffect(() => {

    return async () => {
      if (hasLeftRoom.current) return;
      await RoomService.handlePauseDebate()
      await RoomService.closeTracks()
      await removeParticipant()
      AddActiveDebate(null)
    }
  }, []);
  useEffect(()=>{
  if(activeDebateRef.current){

    const {admin:{_id}} = activeDebateRef.current;

    lastApiCallConfig.current={
      ...lastApiCallConfig.current,
      admin:_id
    }
  }
  },[activeDebateRef.current])

  useLayoutEffect(() => {
    if (!isLive) return;
    console.log("initializing agora",isLive)
    RoomService.getAgoraToken()
  }, [isLive]);

  useEffect(() => {
    debateStateRef.current = debateState
  }, [debateState])

  useEffect(() => {
    if (UrlSearchParams.get("audience")) {
      setWatchType("AUDIENCE")
    } else {
      setWatchType("PARTICIPANT")
    }
  }, [UrlSearchParams]);

  useEffect(() => {
    if (!debateId) return;
    fetchDebateById()
  }, [debateId]);

  useEffect(() => {
    let now = new Date().getTime();
    if (now < activeDebateRef.current?.startTime) {
      SetRoomIsLiveOrNot(false)
    } else {
      SetRoomIsLiveOrNot(true
      )
    }

  }, [activeDebateRef.current, data])

  useEffect(() => {
    if (!isLive && activeDebateRef.current) {
      const { startTime } = activeDebateRef.current;
      let intervalId;
      intervalId = setInterval(() => {

        const diff = startTime - Date.now();
        if (diff > 0) {

          const { day, hour, min, sec } = getTimeFromMs(diff)
          setHandleRemaining({
            hour,
            day,
            min,
            sec
          })
        } else {
          clearInterval(intervalId)
          SetRoomIsLiveOrNot(true)
        }

      }, 1000);
    }
  }, [isLive, activeDebateRef.current])

  useEffect(() => {
    if (!activeDebateRef.current) return;
    if (data) {
      let isParticipant = activeDebateRef.current?.teams.some(team => team.members.some(member => member._id === data?._id))
      if (isParticipant) {
        SetIsUserParticipant(true)
      } else {
        SetIsUserParticipant(false)
      }
    } else {
      SetIsUserParticipant(false)
    }
  }, [data, activeDebateRef.current?.teams])

  useEffect(() => {


    if (!roomLoading) return;

    if (isLive && !UrlSearchParams.get("audience") && activeSpeakers.length > 0) {
      SetRoomLoading(false)
    }
    if (!isLive && activeDebateRef.current) {
      SetRoomLoading(false)
    }

    if (isLive && UrlSearchParams.get("audience") && activeDebateRef.current) {
      SetRoomLoading(false)
    }

  }, [isLive, activeSpeakers, activeDebateRef.current])
  useEffect(() => {


    if (!Rtm_client || !rtmChannelRef.current) return;
    setInitialDebateState()



  }, [rtmChannelRef.current])

  useEffect(()=>{
    if(lastApiCallConfig.current.hasApiCalled){
      navigate(`/completion/${activeDebateRef.current._id}`);
    }
  },[lastApiCallConfig.current.hasApiCalled]);
  useEffect(()=>{

    if(lastApiCallConfig.current.startApiCalled){
      setStartAnalyze(true)
    }
  },[lastApiCallConfig.current.startApiCalled])








  

  const setInitialDebateState = async () => {
    try {
    const attr = await RoomService.getChannelAttributeFunc()
    let { speakersData, debateRounds } = attr;
    if (speakersData) {
      speakersData = JSON.parse(speakersData?.value);
      const activeSpeakerTeam = speakersData;
      if (activeSpeakerTeam === "null") {
        setActiveMicControlTeam(null)
      } else if (activeSpeakerTeam === "both") {
        setActiveMicControlTeam("both")
      } else {
        setActiveMicControlTeam(RoomService.getTeamDataByName(activeSpeakerTeam.teamName))
      }
    } else {
      setActiveMicControlTeam(null);
    }
    if (debateRounds) {
      debateRounds = JSON.parse(debateRounds?.value)
      setDebateState(debateRounds);
    }
  } catch (error) {
      console.log(error)
  }
  }

  
  const fetchDebateById = async () => {
    if (!debateId) return;
    try {
      const res = await getDebateByPassocde(debateId)
      if (res.status !== 200) throw Error(res.data.message)
      activeDebateRef.current = res.data.message[0];

      AddActiveDebate(activeDebateRef);

    } catch (error) {
      console.log(error)
    }
  }
  const removeParticipant = async () => {
    if (!UrlSearchParams.get("audience") && data && activeDebateRef?.current) {
      try {
        await removeParticipantApi(activeDebateRef?.current?._id, {
          participantId: data?._id
        })


      } catch (error) {
        console.log(error)
      }
    }

  }

  console.log(lastApiCallConfig.current.startApiCalled,"start")

  return (
    <>
      <Navbar />
      {
       (startAnalyze ) && <AnalyzeResultModal activeDebate={activeDebateRef.current}/>
      }
      <div  className='DebateRoomWrapper' onClick={()=>RoomService.getChannelAttributeFunc()} >
        <div className='debate_room_top_header'>
          {isLive &&
            <div className="debate_room_top_header_left">
              <img width={"40px"} src="/images/error_dino.png" alt="dinosour" />
              <h1 className='Debate_room_main_text' >
                {activeDebateRef.current?.topic}  </h1>
            </div>
          }
          {isLive &&
            (debateState.isStarted && !debateState.isPaused) && (<>
              <div>

                <h1 className="main_timing_text">
                  {`ROUND FINISH IN ${getTimeCountDown(timeRemainingRef.current)} `}
                </h1>
              </div>
            </>
            )
          }

        </div>
        <DebateScreenBox
          isLive={isLive}
          roomMembers={RoomMembers}
          debateState={debateState}
          activeSpeakers={activeSpeakers}
          timeRemainingRef={timeRemainingRef}
          isUserParticipant={isUserParticipant}
          isNotWatch={WatchType !== "AUDIENCE"}
          activeMicControlTeam={activeMicControlTeam}
          RoomService={RoomService}
          handleCloseDebate={RoomService.handleCloseDebate}
          startTeam={activeDebateRef.current?.timeFormat[0].team}
        />
      
        <div className="debate_bottom_content">
        {
          !debateStateRef.current?.hasFinished  &&   <DebateAction
          isLive={isLive}
          roomId={debateId}
          micMuted={micMuted}
          WatchType={WatchType}
          RoomService={RoomService}
          setMicMuted={setMicMuted}
          roomMembers={RoomMembers}
          debateState={debateState}
          micControlTeam={activeMicControlTeam}
          isUserParticipant={isUserParticipant}
          activeMicControlTeam={activeMicControlTeam}
        />
        }
          <DebateInfo />
          <div className='debate_bottom_container'>
            <Participants />
            <LiveChat 
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default DebateRoom


