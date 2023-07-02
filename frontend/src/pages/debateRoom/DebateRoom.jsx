import { useToast } from '@chakra-ui/react';
import { useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import AgoraRTC from 'agora-rtc-sdk-ng'
import { useDispatch } from "react-redux"
import AgoraRTM from 'agora-rtm-sdk'
import {  useNavigate, useParams, useSearchParams } from "react-router-dom"
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect, useLayoutEffect, useState, useRef } from "react"
import DebateScreenBox from "../../Layouts/Debate/DebateScreenBox/DebateScreenBox"
import Participants from "../../Layouts/Debate/Participants/Participants"
import Navbar from "../../Layouts/Navbar/Navbar"
import LiveChat from "../../components/DebateRoom/LiveChat/LiveChat"
import {  getDebateByPassocde } from "../../utils/Api"
import { DebateRoomServices, getTime, getTimeCountDown, getTimeFromMs } from "../../utils/services"
import { actionCreators } from "../../redux/store"
import DebateAction from "../../components/DebateRoom/DebateAction/DebateAction"
import "./DebateRoom.css"
import DebateInfo from "../../Layouts/Debate/DebateInfo/DebateInfo";
import AnalyzeResultModal from '../../Layouts/modal/DebateFinishedModal/AnalyzingResult';
import SpeakTimeLeft from '../../Layouts/Debate/SpeakTimeLeft/SpeakTimeLeft';
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
  const { AddActiveDebate, addLiveMessages, SetRoomIsLiveOrNot, SetIsUserParticipant, setRtmChannelAction,  SetRoomLoading ,setRoomService } = bindActionCreators(actionCreators, dispatch)
  const [activeMicControlTeam, setActiveMicControlTeam] = useState(null)
  const [audioTracks, setAudioTracks] = useState({
    localAudioTracks: null,
    remoteAudioTracks: {}
  });
  
      const [remainingTime,setRemainingTime] =useState({
        day:null,
        hour:null,
        min:null,
        sec:null
      })
  const toast = useToast();
  const navigate = useNavigate()
  const debateStateRef = useRef()
  const MicElmRef = useRef();
  const activeDebateRef = useRef()
  const timeRemainingRef = useRef()
  const [micMuted, setMicMuted] = useState(true)
  const [RoomMembers, setRoomMembers] = useState([]);
  const [activeSpeakers, setActiveSpeakers] = useState([]);
  const [startAnalyze,setStartAnalyze] =useState(false);
  const startsIntervalIdRef  =useRef()
  const lastApiCallConfig= useRef({
    admin:null,
    hasApiCalled:false,
    startApiCalled:false,
  })
  const [debateState, setDebateState] = useState({
    speakTime: 0,
    round_shot: 0,
    changedAt: 0,
    startedAt: 0,
    remainingTime: 0,
    speakTeam: "",
    isStarted: false,
    hasFinished: false,
    isInterval:false,
    isPaused: false,
    both: false,
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
  const {transcript,resetTranscript , listening} = useSpeechRecognition()
  const RoomService = new DebateRoomServices({
    data,
    isLive,
    rtcUid,
    navigate,
    hasLeftRoom,
    MicElmRef,
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
  const [speakTimeLeft,setSpeakTimeLeft] = useState(0)
  const [gapCountDown,setGapCountDown]=useState({
    sec:0,
  })

  useEffect(()=>{
    setRoomService(RoomService)
  },[])
  useEffect(() => {

    return async () => {
      console.log("unmounting");
      if (hasLeftRoom.current) return;
      await RoomService.closeTracks()
      await RoomService.removeParticipant()
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
    if (!isLive && !activeDebate?.current) return;
    if(activeDebate?.current?.hasEnded)return;
    RoomService.getAgoraToken()
  }, [isLive , activeDebate?.current?.hasEnded]);

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

  useEffect(()=>{
    if(activeDebate?.current?.hasEnded){
      const {_id} = activeDebate.current
      navigate(`/completion/${_id}`)
    }
  },[activeDebate?.current])


    useEffect(()=>{
      if(debateState?.isStarted===false){
        if(activeDebate?.current){
          const {startTime} = activeDebate?.current
           startsIntervalIdRef.current =  setInterval(() => {

            if(startTime > Date.now()){

              
              const {sec,min,hour,day} = getTimeFromMs(activeDebate?.current?.startTime);
            setRemainingTime({
                sec,
                day,
                hour,
                min
              })
              
            }else{
                clearInterval(startsIntervalIdRef.current)
            }
            
        }, 1000);
      }
    }
    },[activeDebate?.current]);

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
    if (!Rtm_client || !rtmChannelRef.current || !activeDebateRef.current) return;
    RoomService.setInitialDebateState()
  }, [rtmChannelRef.current , activeDebateRef?.current])

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



  
  const fetchDebateById = async () => {
    if (!debateId) return;
    try {
      const res = await getDebateByPassocde(debateId)
      if (res.status !== 200) throw Error(res.data.message)
      activeDebateRef.current = res.data.message[0];
      AddActiveDebate(activeDebateRef);

    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <>
      <Navbar />
      {
       (startAnalyze ) && <AnalyzeResultModal activeDebate={activeDebateRef.current}/>
      }
      <div  className='DebateRoomWrapper'  >
                <div className="speak_time_debate_state">
        
          { 
(isLive &&  debateState?.isStarted  === false && debateState?.hasFinished === false ) && "Waiting for debators to start"
          }
          {
            isLive && debateState?.isPaused && "paused"
          }
          {
            (isLive && debateState?.isStarted && debateState?.hasFinished === false && debateState?.isPaused ===false ) && "Ongoing"
          }
          {
            (isLive && debateState?.hasFinished ) && "Completed"
          }
          {
            isLive === false && "Not Started"
          }
        </div>
        <div className='debate_room_top'>
        <div className='debate_room_top_header'>
          
            <h1 className='Debate_room_main_text' >
               {activeDebateRef.current?.topic}  </h1>
        
          {isLive &&
          <>
          
          {  (debateState?.isStarted && !debateState?.isInterval) && (<>
              
                <h1 className="main_timing_text">
                  {   `${ Boolean(getTime(speakTimeLeft)) ? `TIME LEFT  ${getTime(speakTimeLeft)}`:""}  `}
                </h1>
              
            </>
            )}

                {  (debateState.isStarted && debateState.isInterval) && (<>
              
                <h1 className="main_timing_text">
                  {   `${ Boolean(gapCountDown.sec) ? `INTERVAL FINISHES AFTER  ${gapCountDown.sec} sec`:""}  `}
                </h1>
              
            </>
            )}
          
          </>
          }
          {
            isLive ===false && <h1 className='main_timing_text'>
              DEBATE STARTS IN {getTimeCountDown(null,remainingTime.day,remainingTime.hour,remainingTime.min,remainingTime.sec)}
            </h1>
          }
          
        </div>
        <DebateScreenBox
         isLive={isLive}
         setGapCountDown={setGapCountDown}
        lastApiCallConfig={lastApiCallConfig}
        setSpeakTimeLeft={setSpeakTimeLeft}
         roomMembers={RoomMembers}
         debateState={debateState}
         activeSpeakers={activeSpeakers}
         timeRemainingRef={timeRemainingRef}
         isUserParticipant={isUserParticipant}
          isNotWatch={WatchType !== "AUDIENCE"}
         activeMicControlTeam={activeMicControlTeam}
         RoomService={RoomService}
         startTeam={activeDebateRef.current?.timeFormat[0].team}
        />
        {
          !debateStateRef.current?.hasFinished  &&   <DebateAction
          MicElmRef={MicElmRef}
          isLive={isLive}
          roomId={debateId}
          micMuted={micMuted}
          WatchType={WatchType}
          RoomService={RoomService}
          setMicMuted={setMicMuted}
          resetTranscript={resetTranscript}
          setStartListening={()=>SpeechRecognition.startListening({continuous:true})}
          setStopListening={()=>SpeechRecognition.stopListening()}
          roomMembers={RoomMembers}
          debateState={debateState}
          micControlTeam={activeMicControlTeam}
          isUserParticipant={isUserParticipant}
          activeMicControlTeam={activeMicControlTeam}
        />
}
  
    <SpeakTimeLeft
        startTeam={activeDebateRef?.current?.timeFormat[0].team}
        debateState={debateState}
        //  countDown={countDown} 
         />
   </div>
        <div className="debate_bottom_content">
        
        
          {/* <DebateInfo /> */}
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

