import { useDispatch, useSelector } from 'react-redux'
import "./DebateScreenBox.css"
import { useEffect, useState, useRef } from 'react';

import DebateScreenSkeleton from "../../Skeleton/DebateScreenBox/DebateScreenSkeleton"
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/store';
import DebateBanner from '../../../components/DebateRoom/DebateBanner/DebateBanner';
import DebateScreen from './DebateScreen/DebateScreen';

const DebateScreenBox = ({ setGapCountDown, setSpeakTimeLeft, timeRemainingRef, roomMembers, activeSpeakers, isLive, debateState ,
RoomService
}) => {
  const { activeDebate, activeParticipants } = useSelector((state) => state.debate);
  const dispatch = useDispatch()
  const {setRemoveIntervalFunc} = bindActionCreators(actionCreators,dispatch )
  const intervalArrRef = useRef([])
  const [teams, setTeams] = useState([]);
  const intervalRef = useRef()
  const [countDown, setCountDown] = useState({
    min: null,
    sec: null

  });


  useEffect(() => {
    if (activeDebate?.current && roomMembers) {
      let speakerTeams = roomMembers.filter(speaker => {
        return activeDebate?.current.teams.some(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        })
      }).map(speaker => {
        let team = activeDebate.current.teams.find(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
        return { id: speaker.id, teamName: team.name, ...speaker };
      })?.reduce((acc, speaker) => {
        if (acc[speaker.teamName]) {
          acc[speaker.teamName].push(speaker);
        } else {
          acc[speaker.teamName] = [speaker];
        }
        return acc;
      }, {});




      const TeamArray = [
        {
          name: activeDebate?.current.teams[0].name,
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
      setTeams(TeamArray)
    }
  }, [activeDebate?.current, roomMembers])

  useEffect(() => {
    if (!debateState ) return;
    const { hasFinished, isStarted, isPaused ,isInterval  ,changedAt} = debateState;

    if(!isStarted || hasFinished)return;
    if(isInterval){
       handleIntervalLeft()
    }else if(isPaused){
      handlePausedTimeLeft()
    }else if(intervalArrRef.current.length < 1){
      handleTimeLeft()
    }

  }, [debateState, intervalArrRef.current])

  useEffect(()=>{
    if(!debateState)return;
    const {hasFinished}  = debateState;
    if(!hasFinished)return;
    closeDebate()
  },[debateState?.hasFinished])

  const closeDebate=async()=>{
      await RoomService.handleCloseDebate();
      closeInterval()
  }

  useEffect(()=>{
    handleSetFunc()
  },[intervalArrRef.current,intervalRef.current])
  
  const handleTimeLeft = () => {
      const { remainingTime  , changedAt} = debateState;
      intervalRef.current = setInterval(() => {
      const end = changedAt + remainingTime;
      const diff = end - Date.now();

      if (diff >= 0) {
        timeRemainingRef.current = diff;
        setSpeakTimeLeft(diff)
        let min = Math.floor(diff / (1000 * 60));
        let sec = Math.floor((diff / 1000) % 60);

        setCountDown({
          min,
          sec
        })
      } else {
        setCountDown({
          min: 0,
          sec: 0,
        })
        timeRemainingRef.current = 0;
        clearInterval(intervalRef.current)
        intervalArrRef.current = []
        RoomService.handleFinishSpeakTime()
        // end this round and pass mic to next team and update the channel
      }
    }, 1000);

    intervalArrRef.current = [intervalRef.current]
  }

  const handlePausedTimeLeft = () => {
      const { remainingTime } = debateState;
      setSpeakTimeLeft(remainingTime);
      let min = Math.floor(remainingTime / (1000 * 60));
      let sec = Math.floor((remainingTime / 1000) % 60);
      setCountDown({
        min,
        sec
      })

      closeInterval()
    
    } 

    const handleIntervalLeft=()=>{

  const {changedAt} = debateState;
  const {intervalTime} = activeDebate?.current;
  const endsAt = changedAt + (intervalTime * 1000);  // * 1000 to change sec to ms


  let intervalId= setInterval(() => {
    
    const diff =   endsAt - Date.now();
      
    if(diff>0){

      
      let sec = Math.floor((diff / 1000) % 60);


      setGapCountDown({
        sec
      })
      
    }else{
       setGapCountDown({
        sec:0,
      })
      clearInterval(intervalId)
      RoomService.finishInterval();
      
    }

  }, 1000);





    }

    const handleSetFunc=()=>{
      let data={
        intervalRef,
        intervalArrRef
      }
      setRemoveIntervalFunc(data)
    }


    const closeInterval=()=>{
      if(intervalRef?.current){
        clearInterval(intervalRef.current);
      }
      if(intervalArrRef.current.length !==0){
        intervalArrRef.current = [];
      }
    }
  return (
    <>

    {
      isLive ? <>

      <div className="DebateScreenBoxWrapper" onClick={handleSetFunc}>
          {
          (activeDebate?.current && activeParticipants) ?

            teams?.map(((team,index)=><DebateScreen activeSpeakers={activeSpeakers} team={team} teamOne={index===0}/>))
       
        
               
            :
            <DebateScreenSkeleton />
        }





      </div>
      </>:<DebateBanner/>

    }

    
    </>
  )
}

export default DebateScreenBox