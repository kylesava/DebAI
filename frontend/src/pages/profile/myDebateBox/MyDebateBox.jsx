import React, { useState } from 'react'
import { useEffect } from 'react'
import { getDebateOfUserApi } from '../../../utils/Api'
import DebateCard from '../../../components/DebateRoom/DebateCard/DebateCard'
import DebateCardSkeleton from '../../../Layouts/Skeleton/DebateSkeleton/DebateCardSkeleton'
import NoLiveDebate from '../../../Layouts/Debate/NoLiveDebate/NoLiveDebate'
import { useParams } from 'react-router-dom'
import { getLoggedInUserData } from '../../../utils/services'

const MyDebateBox = ({own}) => {

    const [debatesArr, setDebatesArr] = useState(null);
    const { profileId } = useParams()
    const currentUser = getLoggedInUserData();

    useEffect(() => {
        if (!profileId) return
        fetchDebateOfUser()
    }, [profileId])

    const fetchDebateOfUser = async () => {

        try {
            const res = await getDebateOfUserApi(profileId);
            if (res.status === 200) {
                setDebatesArr(res.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }

    };
    return (
        <div className='my_profile_debate_box_Wrappper'>

            {

                debatesArr ? debatesArr.length > 0 ? debatesArr.map((debate) => (
                    <DebateCard debate={debate} />
                )) : currentUser?.subStatus && <NoLiveDebate  show_btn={own} text={`No upcoming debates`} buttonText={"createNow"} btnLink="/create" /> : <DebateCardSkeleton />

            }
        </div>
    )
}

export default MyDebateBox