import { useDispatch, useSelector } from "react-redux";
import "./ProfileCard.css"
import { BsBroadcast, BsFillSpeakerFill, BsCurrencyDollar, BsFillCalendarFill } from "react-icons/bs"
import { GoBroadcast } from "react-icons/go"
import { getUsersDebateCountApi, logoutApi, updateUserapi } from "../../../utils/Api";
import { bindActionCreators } from "redux";
import { useToast } from "@chakra-ui/react";
import { actionCreators } from "../../../redux/store";
import AvatarCarousel from "../../../Layouts/Slider/Avatar/Avatar";
import { useEffect, useState } from "react";
const ProfileCard = ({ userData }) => {

    const dispatch = useDispatch()
    const toast = useToast()
    const { RemoveLoggedInUser, SetRefreshNow } = bindActionCreators(actionCreators, dispatch)
    const { data } = useSelector((state) => state.user)
    const [debatesCount, setDebatesCount] = useState({
        upcomingDebate: null,
        liveDebate: null,
    })
    const [isMe, setIsMe] = useState(null)
    const handleLogout = async () => {

        try {
            const res = await logoutApi();
            if (res.status === 200) {
                RemoveLoggedInUser()
                toast({
                    title: '',
                    description: "You Logged out successfully",
                    status: 'error',
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                })
            } else {
                throw Error("something went wrong")
            }
        } catch (error) {
            console.log(error?.message)
        }
    }
    const handleUpdateAvatar = async (name, avatar) => {

        try {
            const res = await updateUserapi(userData._id, { avatar })
            toast({
                title: '',
                description: "Avatar changed successfully",
                status: 'success',
                duration: 5000,
                position: "top",
                isClosable: true,
            })
            SetRefreshNow()

        } catch (error) {
            toast({
                title: '',
                description: "Failed to change avatar",
                status: 'error',
                duration: 5000,
                position: "top",
                isClosable: true,
            })
        }



    }

    const handleGetDebatesCount = async () => {
        try {
            const res = await getUsersDebateCountApi(userData?._id)
            console.log(res)
            if (res.status === 200) {
                const { liveDebate, upcomingDebate } = res.data.message;
                setDebatesCount({
                    liveDebate,
                    upcomingDebate,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getSubscriptionPlan=()=>{
        const {subscription} = data;
        if(!subscription.status || subscription?.status === "canceled" || !subscription){

            return "Free"

        }else if(subscription?.status === "active"){
            return subscription?.plan + "ly"
        }
    }

    useEffect(() => {
        if (!userData?._id) return;
        if (userData._id === data?._id) {
            setIsMe(true
            )
        } else {
            setIsMe(false)
        }
        handleGetDebatesCount()
    }, [data, userData])

    return (
        <div className="ProfileCard">
            <div className="profile_card_top">

                <div className="profile_card_left">

                    <div className="profile_basic_info_item">

                        <div className="profile_card_avatar_wrapper">

                            <img draggable={false} src={userData?.avatar} alt={`${userData.firstname}'s avatar`} />


                        </div>
                        <div className="profile_card_item basic_userinfo_item">
                            <div>

                                <h1 className="profile_card_username">{`${userData?.firstName} ${userData?.lastName}`}</h1>
                                <p className="profile_card_email">{userData?.email}</p>

                            </div>
                            {
                                isMe === null ? "" : isMe ? <button onClick={handleLogout} className="logout_button">Logout</button> : ""

                            }


                        </div>
                    </div>

                </div>
                <div className="profile_card_item">
                    <h1 className="profile_card_item_title">OTHER INFORMATION</h1>
                    <div className="other_info_text_item">

                        <BsFillSpeakerFill />

                        <p className="other_info_text">created {debatesCount.liveDebate !== null ? parseInt(debatesCount.liveDebate) + parseInt(debatesCount.upcomingDebate) : ""} {parseInt(debatesCount.liveDebate) + parseInt(debatesCount.upcomingDebate) > 1 ? "debates" : "debate"}</p>
                    </div>
                    {
                        (debatesCount.liveDebate !== null && debatesCount.liveDebate > 0) && <div className="other_info_text_item">

                            <BsBroadcast className="live_icon" />   <p className="other_info_text">{debatesCount.liveDebate}  {debatesCount.liveDebate > 1 ? "debates are " : "debate is"} live</p>
                        </div>
                    }
                    {
                        (debatesCount.upcomingDebate !== null && debatesCount.upcomingDebate > 0) && <div className="other_info_text_item">

                            <GoBroadcast className="upcoming_icon" />  <p className="other_info_text">{debatesCount.upcomingDebate}  {debatesCount.upcomingDebate > 1 ? "debates are " : "debate is"} upcoming</p>


                        </div>
                    }
                    {
                        (data.subscription !== null) && <><div className="other_info_text_item">

                            <BsCurrencyDollar className="upcoming_icon" />
                            <p className="other_info_text"> Plan: {getSubscriptionPlan()}</p>


                        </div>
                        {

                        data?.subscription?.status==="active" &&    <div className="other_info_text_item">

                            <BsFillCalendarFill className="upcoming_icon" />
                            <p className="other_info_text">Reamining Days: {data?.subscription?.remainingDays}</p>

                        </div>

                        }
                        </>
                    }

                </div>
                
            </div>
            <div>
                <h1 className="profile_card_item_title">Equipped Avatars</h1>
                <div className="image-row">
                    {
                        data.equipedAvatars?.map((item, index) => (
                            <img className="circle-image" width={"40px"} src={item.avatar} alt="avatar1" onClick={() => handleUpdateAvatar(item.type, item.avatar) } />
                        ))
                    }
                </div>
            </div>
            {/* {
                isMe === null ? "" : isMe ? <AvatarCarousel currentAvatar={userData?.avatar} onChange={handleUpdateAvatar} /> : ""

            } */}






        </div>
    )
}

export default ProfileCard;
