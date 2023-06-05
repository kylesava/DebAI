import TeamForm from './TeamForm/TeamForm'
import DatePicker from "react-datepicker"
import DebateInformation from "./DebateInformation.jsx"
import DebateFormat from './DebateFormat/DebateFormat'
import { Enums } from '../../redux/action/actionTypes/Enumss'
import DebateMotionModal from '../../Layouts/modal/DebateMotions/DebateMotions';

const MainDebateInput = ({debateForm,handleInputChange,handleAutoGenerateePasscode,handleDebateTopicChange,handleStartDate,handlePassCodeChange ,startTime,isPasscodeValid,filterPassedTime,durationType,handleInstatDebateChange,instantDebateTimes,returnTeamFormatOptions}) => {
  return (
    <div className='input_box_wrappers'>

    <div className='input_basic_box'>
      <DebateMotionModal activeTopic={debateForm.topic} handleDebateTopicChange={handleDebateTopicChange}>

      <div className='input_item'>

        <input type="text" disabled placeholder='Topic for debate' name='topic' onChange={handleInputChange}  value={debateForm.topic}/>
      </div>
      </DebateMotionModal>
   
      <div className='input_item'>
        <select id="" name='type'  value={debateForm?.type} onChange={handleInputChange}>
          <option selected disabled>choose debate type</option>
          <option value="British Parliamentary">British Parliamentary</option>
          <option value="Public forum">Public forum</option>
          <option value="Lincoln–Douglas">Lincoln–Douglas</option>
        </select>
      </div>
      <div className='input_item'>


<div className='input_row_box_parent'>
<input type="number" minLength={6} maxLength={6} max={6} placeholder='random 6 digit number'  name='passcode' onChange={handlePassCodeChange} value={debateForm.passcode}/>
<button onClick={handleAutoGenerateePasscode}>Auto Generate</button>
</div>
{
!isPasscodeValid && <label className='error_text' >This passcode is already taken  try next ! </label>}
</div>



    </div>
    <div className="right_input_box">
      <div className='form_input_row_box input_item'>

        <div className='starting_time_item_box'>

          <div className='starting_time_item'>
            <DatePicker
              selected={startTime}
              onChange={(date) => handleStartDate(date)}
              showTimeInput

              timeInputLabel="Time:"
              filterTime={filterPassedTime}
              dateFormat="yyyy/MM/dd , h:mm aa"
            />

          </div >

        </div>
      </div>
      <div className='input_item'>
        <select value={debateForm.team_format}  name='team_format' className='team_format' onChange={handleInputChange}>
          <option value="" selected disabled>chose team format</option>
          {
            returnTeamFormatOptions()
          }

        </select>
      </div>
        <div className='input_item'>
          <select value={debateForm.judgeType}  name='judgeType' className='team_format' onChange={handleInputChange}>
          <option value={""} disabled selected >Choose Judge Type</option>
          <option value={`${Enums.AIJUDGE}`}>AI Judge</option>
          <option value={`${Enums.VOTING}`}>Voting</option>
          <option value={`${Enums.NOJUDGE}`}>No Judge </option>
          </select>
        </div>




      <div className='starting_time_item input_item'>

        {
          durationType === "Instant Debate" && <div className='instant_box'>
            <button className={`${instantDebateTimes === "1Minute" && "active_duration"}`} onClick={() => handleInstatDebateChange("1Minute")}>1 Minutes </button>
            <button className={`${instantDebateTimes === "2Minute" && "active_duration"}`} onClick={() => handleInstatDebateChange("2Minute")}>2 Minutes  </button>
            <button className={`${instantDebateTimes === "3Minute" && "active_duration"}`} onClick={() => handleInstatDebateChange("3Minute")}>3 Minutes  </button>

          </div> 
          
        }


      </div>
    </div>
  </div>
  )
}

export default MainDebateInput