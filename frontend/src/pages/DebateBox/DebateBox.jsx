import React, { useState } from 'react'
import DebateCard from '../../components/DebateRoom/DebateCard/DebateCard'

const MyDebateBox = ({debates}) => {

    return (
        <div className='my_profile_debate_box_Wrappper'>

            {
                debates.length > 0 ? debates.map(debate => (<DebateCard key={debate._id} debate={debate} />)) : <h2>No Debate Found</h2>
            }
        </div>
    )
}

export default MyDebateBox