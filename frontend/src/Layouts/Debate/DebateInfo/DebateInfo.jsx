import { useDispatch, useSelector } from 'react-redux'
import DebateTeam from '../Team/DebateTeam'
import "./DebateInfo.css"
import { useEffect, useState } from 'react'
import { getTheVotedTeam } from '../../../utils/services'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux/store'


const DebateInfo = () => {
    const { activeDebate ,isLive } = useSelector((state) => state.debate);
    const {data} =useSelector(state=>state.user)
    const dispatch = useDispatch()
    const {setVotedTeamAction} = bindActionCreators(actionCreators,dispatch)


    useEffect(()=>{
        if(!activeDebate?.current || !data?._id)return;
       let theTeamIVoted = getTheVotedTeam(activeDebate?.current.teams,data?._id )
       if(theTeamIVoted){
        setVotedTeamAction(theTeamIVoted)
       }else{
        setVotedTeamAction(null)
       }
    },[activeDebate?.current,data?._id])
  



    return (
        <div className='DebateInfoWrapper'>
            <div className='debates_team_box'>
                {
                    activeDebate?.current?.teams.map((team, index) => (
                        <DebateTeam  key={index} isLive={isLive} team={team} index={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default DebateInfo