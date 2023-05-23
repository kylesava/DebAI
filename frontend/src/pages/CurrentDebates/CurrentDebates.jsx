import { useEffect, useState } from "react"
import DebateCard from "../../components/DebateRoom/DebateCard/DebateCard"
import Navbar from "../../Layouts/Navbar/Navbar"
import { getAllDebateApi, getCurrentDebateApi } from "../../utils/Api"
import { useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../redux/store"
import { useDispatch } from "react-redux"
import './CurrentDebates.css'
import { Enums } from "../../redux/action/actionTypes/Enumss"
import Skeleton from "../../Layouts/Skeleton/Skeleton"
import NoLiveDebate from "../../Layouts/Debate/NoLiveDebate/NoLiveDebate"


const CurrentDebates = () => {
  const [theDebateArr, settheDebateArr] = useState(null);
  const { currentDebateTab } = useSelector((state) => state.debate)
  const {data:currentUser}  =useSelector(state=>state.user)
  const dispatch = useDispatch()
  const { AddLiveDebateTab, AddUpcominggDebateTab } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    handleFetchtheDebateArr()
  }, [currentDebateTab])


  const handleChangeDebateTabtype = (type) => {
    if (type === currentDebateTab) return;
    if (type === Enums.LIVE_TAB) {
      AddLiveDebateTab()
    } else {
      AddUpcominggDebateTab()
    }
    settheDebateArr(null)
  }


  const handleFetchtheDebateArr = async () => {
    let res = null
    try {
      if (currentDebateTab === Enums.LIVE_TAB) {
        res = await getCurrentDebateApi()
      } else {
        res = await getAllDebateApi()
      }
      if (res.status === 200) {
        settheDebateArr(res.data.message)
      } else {
        throw Error(res.data.message)
      }
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <>
      <Navbar />
      <div className="CurrentDebatesWrapper">
        <div className="currentDebates_bg">

        </div>
        <div className="current_debates_header">
          <h3 className="live_debates text1">{currentDebateTab === Enums.UPCOMING_TAB ? "UPCOMING" : "ONGOING"}
          DEBATES
          </h3>
          <div className="tab_buttons_wrapper">
            <button className={`${currentDebateTab === Enums.UPCOMING_TAB ? "active_tab_button" : ""}`} onClick={() => { handleChangeDebateTabtype(Enums.UPCOMING_TAB) }}>Upcoming Debates </button>
             <button className={`${currentDebateTab === Enums.LIVE_TAB ? "active_tab_button" : ""}`} onClick={() => { handleChangeDebateTabtype(Enums.LIVE_TAB) }}>Live Debates</button>
          </div>
        </div>

        <div className="debate_wrapper_list">
          {
            theDebateArr ? theDebateArr.length > 0 ? theDebateArr.map(debate => (

              <DebateCard key={debate._id} debate={debate} isLive={currentDebateTab === "LIVE_TAB"} />
            )) : <><NoLiveDebate text={currentDebateTab === "LIVE_TAB" ? "No Live Debates" : "No Upcoming Debates"} /></> : <p><Skeleton type={"debate_card"} /></p>
          }

        </div>
      </div>
    </>
  )
}

export default CurrentDebates