import { useDispatch, useSelector } from 'react-redux'
import DebatorView from '../DebatorView/DebatorView'
import "./DebateScreenBox.css"
import { useEffect, useState, useRef } from 'react';
import NotStartedView from '../DebatorView/NotStartedView/NotStartedView';
import NoneJoined from '../NoneJoined/NoneJoined';
import DebateScreenSkeleton from "../../Skeleton/DebateScreenBox/DebateScreenSkeleton"
import { TbMicrophone2 } from "react-icons/tb"
import SpeakTimeLeft from '../SpeakTimeLeft/SpeakTimeLeft';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/store';
import DebateBanner from '../../../components/DebateRoom/DebateBanner/DebateBanner';

const DebateScreenBox = ({ setSpeakTimeLeft, lastApiCallConfig, timeRemainingRef, roomMembers, startTeam, handleCloseDebate, activeSpeakers, isLive, debateState, activeMicControlTeam ,
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
    const { hasFinished, isStarted, isPaused } = debateState;
    if(!isStarted || hasFinished)return;

    if(isPaused){
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
      let min = Math.floor(remainingTime / (1000 * 60));
      let sec = Math.floor((remainingTime / 1000) % 60);
      setCountDown({
        min,
        sec
      })

      closeInterval()
    
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
  {/* <SpeakTimeLeft
        startTeam={startTeam}
        debateState={debateState}
         countDown={countDown} 
         /> */}
      <div className="DebateScreenBoxWrapper" onClick={handleSetFunc}>
          {
          (activeDebate?.current && activeParticipants) ?

            <>
              <div className='box_wrappers'>
                <div className='screen_box_header'>

                <img width="64" height="64" src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/external-sword-pirates-justicon-lineal-color-justicon.png" alt="external-sword-pirates-justicon-lineal-color-justicon"/>   <h4 className='team_name teamOne'>{teams[0]?.name}</h4>
              

                </div>
                <div className="left_team">
                  {
                    isLive ? teams[0] && teams[0]?.members?.length > 0 ? teams[0]?.members?.map((mem) => (

                      <DebatorView activeSpeakers={activeSpeakers} debator={mem} key={mem.id} />

                    )) : <NoneJoined team={teams[0]} roboImg={"/images/roboTeam.png"} /> : ""
                  }
                  {
                    !isLive &&
                    <NotStartedView team={activeDebate?.current?.teams[0]?.members} />
                  }
                </div>
              </div>
              <div className='box_wrappers pink_wrapper'>

                <div className='screen_box_header'>
                  <img width="64" height="64" src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/external-sword-pirates-justicon-lineal-color-justicon.png" alt="external-sword-pirates-justicon-lineal-color-justicon"/>
                  <div className='team_name teamTwo'> {teams[1]?.name}</div>
                </div>
                <div className="right_team">
                  {
                    isLive ? teams[1] && teams[1]?.members?.length > 0 ? teams[1]?.members?.map((member) => (
                      <DebatorView pink={true} activeSpeakers={activeSpeakers} debator={member} key={member._id} />
                    )) : <NoneJoined team={teams[1]} roboImg={"/images/roboTeam2.png"} /> : ""
                  }
                  {
                    !isLive && <NotStartedView pink={true} team={activeDebate?.current?.teams[1]?.members} />
                  }
                </div>
              </div>
            </>
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