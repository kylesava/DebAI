import "./NoLiveDebate.css"
import { useNavigate } from "react-router-dom"

const NoLiveDebate = ({ text, buttonText, btnLink ,show_btn }) => {


    const navigate = useNavigate()
    const handleGoBack = () => {
        let to = btnLink ?? -1
        navigate(to)
    }


    return (
        <div className='NoLiveDebateWrapper'>

            <img draggable={false} className="no_live_debate_dino_img" src="/images/error_dino.png" alt="error_dino" />
            <div className="_noLive_debate_bottom_">
                <h3 className="no_live_debate_text">{text} </h3>
            {

                show_btn &&  <button className="check_upcoming_videos" onClick={handleGoBack} >{buttonText ?? "Go Back"}</button>
            }   
            </div>
        </div>
    )
}

export default NoLiveDebate