import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createDebateApi, getIsPassocodeUniqueApi } from '../../utils/Api'
import TeamForm from './TeamForm/TeamForm'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import DebateInformation from "./DebateInformation.jsx"
import './DebateFormInput.css'
import DebateFormat from './DebateFormat/DebateFormat'
import { generateRandomNumber, getLoggedInUserData } from '../../utils/services'
import { debateFormat } from '../../utils/data'
import { Enums } from '../../redux/action/actionTypes/Enumss'



const DebateFormInput = () => {
  const { data:currentUser } = useSelector((state) => state.user)
  const [duration, setDuration] = useState({
    hour: 1,
    minute: 0
  })
  const [durationType, setDurationType] = useState("Set Duration");
  const [instantDebateTimes, setInstantDebateTimes] = useState("1Minute")
  const [startTime, setStartTime] = useState(new Date());
  const [formLevel,setFormLevel] =useState(0);
  const navigate = useNavigate()
  const toast = useToast();
  const [isPasscodeValid,setIsPasscodeValid]= useState(true)
  const [debateForm, setDebateForm] = useState({
    topic: "",
    type: "",
    startTime: 0,
    admin: currentUser?._id,
    judgeType:"",
    duration: 0,
    team_format:"",
    passcode:"",
    timeFormat:{},
    teams: [
      {
        name: "",
        members: []
      },
      {
        name: "",
        members: []
      },
    ]
  })




  useEffect(() => {
    if (durationType === "Instant Debate") {
      handleInstatDebateChange("1Minute")
    } else if (durationType === "Set Duration") {
      setDuration({
        minute: 0, hour: 1
      })

    }
  }, [durationType])
useEffect(()=>{
  if(!currentUser)return ;
  setDebateForm((prev)=>({
    ...prev, admin:currentUser?._id
  }))
},[currentUser])
  useEffect(() => {
    let durationInMs = 1000 * 60 * ((duration.hour * 60) + (duration.minute))
    setDebateForm((prev) => ({
      ...prev, duration: durationInMs
    }))
  }, [duration])
  useEffect(()=>{
    checkIsDebateInputCompleted()
  },[debateForm]);

  
  const checkIsDebateInputCompleted=()=>{
    let missing= false ;
    for(let key in debateForm){
      if(!debateForm[key] && key !=="teams" ){
        console.log("missing",key)
         missing = true;
      }
    }
    if(!missing){
      setFormLevel(1)
    }
  }
  const handleTeamName = (event, teamIndex) => {
    setDebateForm((prev) => ({
      ...prev, teams: prev.teams.map((team, index) => {
        if (index === teamIndex) {
          return { ...team, name: event.target.value }
        } else {
          return team
        }
      })
    }))


  }
  const handleInputChange = (event) => {



    let name = event.target.name
    let value = event.target.value
   
    if (name === "participantsCount" && parseInt(value) > 8) {
      return;
    }
    if (name === "participantsCount" || name === "speakTime") {
      value = parseInt(value)
    }
    setDebateForm(prev => ({
      ...prev, [name]: value
    }))
  }
  const handleCreateDebate = async () => {

    if (!currentUser) {
      toast({
        description: "You need to login first.",
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      return
    }

    let theFormCopy = { ...debateForm }
    let theTeams = theFormCopy.teams.map(team => ({ ...team, members: team.members.map(member => member._id) }))

    const date = new Date(theFormCopy.startTime);


    // Add milliseconds to the date


    // Convert the updated date back to UTC format




    // payloadData.teams;
    let thePayload = {
      ...theFormCopy,
      teams: theTeams,
      admin: currentUser?._id,
      endTime: date.getTime() + theFormCopy.duration
    }

    
    const isValid = handleFormValidate(thePayload)
    let teamMebersCount = thePayload.teams.reduce((acc, item) => {

      let theLen = item.members.length
      return acc + theLen
    }, 0)

    thePayload.participantsCount = teamMebersCount

    if (isValid) {
      try {

        const res = await createDebateApi(thePayload)
        if (res.status === 200) {
          const {message} = res.data
          toast({
            description: "Debate created successfully",
            status: 'success',
            duration: 5000,
            position: "top",
            isClosable: true,
          })
          navigate(`/debate/${message?.passcode}`)
        } else {
          throw Error(res.data.message)
        }
      } catch (error) {
        toast({
          description: "Something went wrong while creating debate",
          status: 'error',
          duration: 5000,
          position: "top",
          isClosable: true,
        })

        console.log(error.message)
      }
    }




  }
  const handleStartDate = (value) => {
    setStartTime(value);
    let startDateInMs = new Date(value).getTime() < new Date().getTime();
    if (startDateInMs) {
      toast({
        description: "Please choose the future date.",
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      return
    }

    setDebateForm((prev) => ({
      ...prev, startTime: new Date(value).getTime()
    }))
  }

  const handleInstatDebateChange = (string) => {

    let durationInMs = 1000 * 60;
    if (string === "1Minute") {
      durationInMs *= 1
      setInstantDebateTimes("1Minute")
    } else if (string === "2Minute") {
      setInstantDebateTimes("2Minute")
      durationInMs *= 2

    } else {
      setInstantDebateTimes("3Minute")
      durationInMs *= 3

    }
    setDebateForm(prev => ({
      ...prev, duration: durationInMs
    }))

  }

  

  const handleFormValidate = (payload) => {
    const missingField = []
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (!value) {
        missingField.push(key)
      }
    });
    // alert(`${missingField.map((key) => key).join("/") } fields are missing`)
    if (missingField.length > 0) {

      toast({
        description: `${missingField.map((key) => key).join("/")} fields are missing`,
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      return false;
    }

    if (durationType === "Set Duration") {
      const hasMoreThanOneMember = payload.teams.every(team => team.members.length >= 1);
      if (!hasMoreThanOneMember) {
        toast({
          description: `Add atleast one member.`,
          status: 'error',
          duration: 5000,
          position: "top",
          isClosable: true,
        })
        return false
      }
    } else {
      const hasOnlyOneMember = payload.teams.every(team => team.members.length === 1);
      if (!hasOnlyOneMember) {
        toast({
          description: `Quick Debate should  have  one member.`,
          status: 'error',
          duration: 5000,
          position: "top",
          isClosable: true,
        })
        return false
      }
    }
    const hasTopic = payload.teams.every(team => team.name);
    if (!hasTopic) {
      toast({
        description: `Team name is required.`,
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      return false
    }
    if (payload.duration <= 0) {
      toast({
        description: `Duration should not be  0.`,
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      })
      return false
    }

    if(payload.teams[0]?.name === payload.teams[1]?.name) {
      toast({
        description: `Teams should not have the same name`,
        status: 'error',
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      return false
    }



    return true


  }
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const returnTeamFormatOptions=()=>{
let formatArr = debateFormat.get(debateForm.type);
if(formatArr){
  let formatVal = formatArr[0].toString();
  if(debateForm.team_format!==formatVal){
    setDebateForm(prev=>({
      ...prev, team_format:formatArr[0].toString(   )
    }))
  }
  return  formatArr.map((format)=>(
    <option value={format.toString()} name={debateForm.type} >{`${format} vs ${format}`}</option>
  ))
}else{
  return <option value={""} disabled>select team format</option>
}
  }
  const handlePassCodeChange=async(event)=>{

    const value = event.target.value ;
    if(value.length >6)return;
    setDebateForm(prev=>({
      ...prev,passcode:+value
    }))
    if(value.length === 6){
      const {data,status} =  await getIsPassocodeUniqueApi(value);
      if(status=== 200){
        const {isUnique}= data.message
        if(isUnique){
          setIsPasscodeValid(true)
          setDebateForm(prev=>({...prev,passcode:+
          value}))
        }else{
          setIsPasscodeValid(false)
        }
      }

      

      }

  }
  const handleAutoGenerateePasscode=async()=>{

   
    let stop= false
    
    do {
  const passcode =  generateRandomNumber()
  const {data,status} =  await getIsPassocodeUniqueApi(passcode);
  if(status=== 200){
    const {isUnique}= data.message
    if(!isUnique){
      setIsPasscodeValid(false)
    }else{
      setIsPasscodeValid(true)
      setDebateForm(prev=>({
        ...prev, passcode
      }))
      stop = true;
    }
  }
  } while (!stop);

}


  return (
    <div className='DebateFormWrapper'>
      <div className="create_debate_header">
        <h1 className='main_text'>CREATE <h1 className='secondary_main_text'>DEBATE</h1> </h1>
      </div>
      <h2 className='header_text_with_bg'>DEBATE INFORMATION</h2>
      <div className='input_box_wrappers'>

        <div className='input_basic_box'>
          <div className='input_item'>

            <label className="form_label" >Topic name</label>
            <input type="text" placeholder='Topic for debate' name='topic' onChange={handleInputChange} />
          </div>
       
          <div className='input_item'>
            <label className="form_label">Debate Type</label>
            <select id="" name='type' onChange={handleInputChange}>
              <option selected disabled>choose debate type</option>
              <option value="British Parliamentary">British Parliamentary</option>
              {/* <option value="World Schools format (WSDC)">World Schools format (WSDC)</option> */}
              <option value="Public forum">Public forum</option>
              <option value="Lincoln–Douglas">Lincoln–Douglas</option>

            </select>
          </div>
          <div className='input_item'>

<label className="form_label" >PASSCODE FOR DEBATE</label>

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
            <label className='form_label' >Starting time </label>

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
            <label className="form_label">Team format</label>
            <select value={debateForm.team_format}  name='team_format' className='team_format' onChange={handleInputChange}>
              {
                returnTeamFormatOptions()
              }

            </select>
          </div>
            <div className='input_item'>
              <label className="form_label">Judge Type</label>
              <select value={debateForm.judgeType}  name='judgeType' className='team_format' onChange={handleInputChange}>
              <option value={""} disabled selected >Choose Judge Type</option>
              <option value={`${Enums.AIJUDGE}`}>AI Judge</option>
              <option value={`${Enums.VOTING}`}>Voting</option>
              <option value={`${Enums.NOJUDGE}`}>No Judge </option>
              </select>
            </div>
          {/* <div className='input_item'>

            <label className='form_label' >Starting time </label>
            <div className='duration_type'>
            
              <button onClick={() => setDurationType("Instant Debate")} className={`${durationType === "Instant Debate" && "active_duration"} duration_toggle_button`}>Instant Debate </button>

            </div>
          </div> */}



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

            <DebateInformation  handleInputChange={handleInputChange} debateForm={debateForm} debateType={debateForm.type}/>

      <div className={`team_box_container ${formLevel !== 1 && "disable_team_box_container_form" } `}>

        <div className='lable_row'>
          <label className="header_text_with_bg">ADD TEAM MEMBERS</label>
          <div className='team_info_text'>
        {

         formLevel === 0 && <span className="red_info">Fill the above debate information to add teams</span>
        } 
            <span >Members must be registed in this site</span>
          </div>
        </div>
        <div className="team_wrapper_box">

          {
            debateForm.teams.map((team, index) => <TeamForm
             debateForm={debateForm}
              setDebateForm={setDebateForm} 
              handleTeamName={handleTeamName}
               team={team} index={index} key={index} />)}
        </div>

      </div>
      {

       <DebateFormat setDebateForm={setDebateForm} debateForm={debateForm} teams={debateForm.teams}/>
      }
      {currentUser?.subscription?.status && <button type='submit' className='create_debate_btn' disabled={!currentUser} onClick={handleCreateDebate}>
        CREATE DEBATE!
      </button>}
    </div>
  )
}

export default DebateFormInput