import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createDebateApi, getIsPassocodeUniqueApi } from '../../utils/Api'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import './DebateFormInput.css'
import { generateRandomNumber, getLoggedInUserData } from '../../utils/services'
import { debateFormat } from '../../utils/data'
import MainDebateInput from './MainDebateInput'
import Teams from './Teams';
import TeamFormat from './TeamFormat';
import ConfirmCreate from './ConfirmCreate';



const DebateFormInput = ({stepIndex,setStepIndex}) => {
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
      handleShowAlert( `You need to login first.`,"error")
      return
    }

    let theFormCopy = { ...debateForm }
    let theTeams = theFormCopy.teams.map(team => ({ ...team, members: team.members.map(member => member._id) }))

    const date = new Date(theFormCopy.startTime);

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
          handleShowAlert( `Debate successfully created.`,"success")
          navigate(`/debate/${message?.passcode}`)
        } else {
          throw Error(res.data.message)
        }
      } catch (error) {
          handleShowAlert( `Something went wrong..`,"error")

        console.log(error.message)
      }
    }




  }
  const handleStartDate = (value) => {
    setStartTime(value);
    let startDateInMs = new Date(value).getTime() < new Date().getTime();
    if (startDateInMs) {
      handleShowAlert( `Choose the future date.`,"error")
      return
    }

    setDebateForm((prev) => ({
      ...prev, startTime: new Date(value).getTime()
    }))
  }
// 
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

 
      handleShowAlert(`${missingField.map((key) => key).join(",")} fields are missing`,"error")
      return false;
    }

    if (durationType === "Set Duration") {
      const hasMoreThanOneMember = payload.teams.every(team => team.members.length >= 1);
      if (!hasMoreThanOneMember) {
        handleShowAlert(" `Add atleast one member`","error")
        return false
      }
    } else {
      const hasOnlyOneMember = payload.teams.every(team => team.members.length === 1);
      if (!hasOnlyOneMember) {
          handleShowAlert(" `Quick debate should have one member`","error")
        return false
      }
    }
    const hasTopic = payload.teams.every(team => team.name);
    if (!hasTopic) {
            handleShowAlert(" `Team name is required`","error")
      return false
    }
    if (payload.duration <= 0) {
      handleShowAlert(" `Duration should not be  0`","error")

      return false
    }

    if(payload.teams[0]?.name === payload.teams[1]?.name) {
      handleShowAlert(" `Teams should not have the same name`","error")
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

  return  formatArr.map((format)=>(
    <option key={format}  value={format.toString()} name={debateForm.type} >{`${format} vs ${format}`}</option>
  ))
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

  const handleShowAlert=(text,type)=>{
    toast({
      description: text,
      status: type,
      duration: 5000,
      position: "top",
      isClosable: true,
    });

  }

  const handleDebateTopicChange=(topic)=>{
    setDebateForm(prev=>(
      {...prev,topic}
    ))
  }

  const goToNext=()=>{
    const {topic,timeFormat,startTime,judgeType,passcode,team_format} = debateForm;
    if(stepIndex===0){

      if(!topic || !timeFormat || !startTime || !judgeType || !passcode || !team_format){
        return false
      }
    }
    return true
  }

  const debateStepMap={
    "0":    <MainDebateInput 
         debateForm={debateForm}
        handleAutoGenerateePasscode={handleAutoGenerateePasscode}  
        handleInputChange={handleInputChange}
        handleStartDate={handleStartDate}
        handleDebateTopicChange={handleDebateTopicChange}
        handlePassCodeChange={handlePassCodeChange}
        startTime={startTime}
        durationType={durationType}
        filterPassedTime={filterPassedTime}
        handleInstatDebateChange={handleInstatDebateChange}
        instantDebateTimes={instantDebateTimes}
        isPasscodeValid={isPasscodeValid}
        returnTeamFormatOptions={returnTeamFormatOptions}
        

        />,
        "1": <Teams 
          handleTeamName={handleTeamName}
         setDebateForm={setDebateForm}
          debateForm={debateForm}
          formLevel={formLevel}
          />,

          "2":<TeamFormat
          debateForm={debateForm}
          setDebateForm={setDebateForm}
          /> ,
          "3":<ConfirmCreate
          currentUser={currentUser}
          handleCreateDebate={handleCreateDebate}
          />
  }

  return (
    <div className='DebateFormWrapper'>

      {
        debateStepMap[String(stepIndex)]
      }


<div  className="create_debate_bottom_button">
     {


      stepIndex !==0 && <button onClick={()=>setStepIndex(prev=>prev-1)} className='back_button'>
        BACK
      </button>
      }
       {
         stepIndex !== 3 && <button className={`${ !goToNext() ? "disableNext":"" }  next_debate_step`} onClick={()=>setStepIndex(prev=>prev+1)}> NEXT </button>
        }  
        </div>
            {/* <DebateInformation  handleInputChange={handleInputChange} debateForm={debateForm} debateType={debateForm.type}/> */}

    
    </div>
  )
}

export default DebateFormInput
