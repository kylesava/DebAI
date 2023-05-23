import AgoraRTC from "agora-rtc-sdk-ng";
import { Rtc_client, Rtm_client  } from "../pages/debateRoom/DebateRoom";
import { Enums } from "../redux/action/actionTypes/Enumss";
import { chatBotApi, getAgoraTokenApi, joinParticipantApi, updateDebateApi } from "./Api";
import { avatarsTypeData } from "./data";
import SpeechRecognition from "react-speech-recognition";
import moment from "moment";

export const getMyTeam = (teams, myUserId) => {
  if (!teams || !myUserId) return;

  return teams.find((team) => team.members.find((mem) => mem._id === myUserId));
};
export const getNextSpeakTeam = (teams, debateStartedTeam, roundShot) => {
  if (!teams || !debateStartedTeam || !roundShot) return;

  let teamsName = teams.map((team) => team.name);
  if (Math.floor(roundShot % 2) === 0) {
    let nextTeam = teamsName.find((team) => team !== debateStartedTeam);
    return nextTeam;
  } else {
    return debateStartedTeam;
  }
};
export const setLoggedInUserData = (userData) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const getLoggedInUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getNameAndVoteOfTeams=(teams)=>{
  const sortedTeams = teams.sort((a, b) => b.vote.length - a.vote.length);

  return sortedTeams.map(team=>({name:team.name , vote:team.vote.length}))
}


export const removeLoggedInUserData=()=>{
  localStorage.removeItem("user")
}


export const getTimeCountDown=(timeInMs , day,hour,min,sec)=>{
  console.log(timeInMs)
  if(timeInMs){
      const { day,hour,min, sec} =    getTimeFromMs(timeInMs)
      return ` ${day ? `${day > 1 ? `${day}days` :`${day}day`} :` :""}  ${hour ? `${hour > 1 ? "hours":"hour"}:`:""} ${(min ||  hour) ? `${min}min :`:""} ${`${sec}sec`}
      `
  }else{

    return ` ${day ? `${day > 1 ? `${day}days` :`${day}day`} :` :""}  ${hour ? `${hour > 1 ? `${hour}hours`:`${hour}hour`}  :`:""} ${(min ||  hour) ? `${min}min :`:""} ${`${sec}sec`}
    `
  }
}

export const getTimeFromMs=(startTime)=>{
    const currentTime = Date.now();
    const timeDifference = startTime - currentTime;
  
    if (timeDifference <= 0) {
      return {
      day: 0,
        hour: 0,
        min: 0,
        sec: 0
      };
    }
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    return {
      day: days,
      hour: hours % 24,
      min : minutes % 60,
      sec: seconds % 60
    };
  }
  

   

export const getTheVotedTeam=(teams,userId)=>{

    const theTeam =  teams.find(team=>team.vote?.find(user=>user===userId))
    if(theTeam){
        return theTeam.name;
    }else{
        return false
    }
}

export const getNamesofTeam=(teams)=>{

    return   teams?.map(team=>team.name)
  

}

export const changeVote=(teams,type,userId ,teamsName )=>{
    return teams.map(team=>{
        if(team.name === teamsName){
            if(type==="pull"){

                return {...team,vote:team.vote.filter(mem=>mem !== userId)}
            }else{
                    return {...team,vote:[...team.vote  , userId]  }
            } 
        }else{
            return team;
        }
    })
}

export function generateRandomNumber() {
  var min = 100000; // Minimum 6-digit number (inclusive)
  var max = 999999; // Maximum 6-digit number (inclusive)

  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber
}

export function getMysterAvatar(gameResult){
  const randomNumber = Math.floor(Math.random()*100);
  let mysteryAvatar ;
  if(gameResult===Enums.WON){
    if(randomNumber<25){
    mysteryAvatar=   getRandomAvatar(avatarsTypeData.common,"Common")
    }else if(randomNumber < 50){
     mysteryAvatar= getRandomAvatar(avatarsTypeData.rare,"Rare")
      
    }else if(randomNumber <75){
   mysteryAvatar=   getRandomAvatar(avatarsTypeData.legendary,"Legendary")
    }else{
      mysteryAvatar= getRandomAvatar(avatarsTypeData.epic,"Epic")
    }
  }else if(gameResult===Enums.LOSE || gameResult === Enums.MATCH_TIED){

    if(randomNumber<5){
          mysteryAvatar=   getRandomAvatar(avatarsTypeData.legendary,"Legendary")
      }else if(randomNumber < 15){
          mysteryAvatar= getRandomAvatar(avatarsTypeData.epic,"Epic")
      }else if(randomNumber <35){
           mysteryAvatar=   getRandomAvatar(avatarsTypeData.rare,"Rare")
      }else{
         mysteryAvatar= getRandomAvatar(avatarsTypeData.common,"Common")
      }
  }
  return mysteryAvatar;
}

const  getRandomAvatar=(avatars , avatarType)=>{
  let randomNum = Math.floor(Math.random() * avatars.length);
 return { type:avatarType,  avatar: avatars[randomNum]}
}
 
export const checkIfUserAlreadyExist=(speakers,uid)=>{
  return speakers.find(speaker=>speaker?.uid ===uid)
}

export const generateArgument =({
  startedTime,
  teamOne,
  teamTwo,
  debateType ,
  speechOne,
  speechTwo,
  topic,

})=>{


return `
 GIVE THE TITLE OF THIS DEBATE INCLUDING THE WINNERS NAME AT THE LAST LINE I WANT A JAVASCRIPT CODE AN OBJECT WITH PROPERTY WINNER ENCLOSED IN CURLY BRASIS {} . AND ITS VALUE SUMMERIZE THE BELOW DEBATE IN 300 WORDS AND 3 PARAGRAPHS . This debate was started in ${startedTime} . This type of debate was  ${debateType} . the debate was on ${topic}. 

 . THERE ARE TWO TEAMS "${teamOne}" and "${teamTwo}" .  The argument of the debate is below in the form of array of object . but i want response in palin text except for the last line that i mentioned above. 
 
  There are two object one with ${teamOne} team speech and another ${teamTwo} teams speech . Now I want you to analyze this debate and choose the debate winner . And also explain why that team won the debate . And the decision should be precised . The debate should not be tied . There should be only one winner const arguments=[ ${teamOne}:{ ${speechOne} } , ${teamTwo}:{ ${speechTwo} } ]


`

}

class DebateRoomServices{

  constructor({rtmChannelRef ,hasLeftRoom , addLiveMessages, navigate,rtcUid ,data:user , lastApiCallConfig, setRoomLoading ,activeDebateRef , debateStateRef ,setDebateState ,setActiveMicControlTeam  ,isAudience ,setRoomMembers ,setMicMuted ,debateId ,RoomMembers ,audioTracks ,setActiveSpeakers ,setRtmChannelAction ,isLive  ,micMuted  ,AddActiveDebate,setMessage  ,showToast , transcript,resetTranscript, activeSpeakers ,timeRemainingRef ,otherState  ,activeMicControlTeam
  }){
    this.navigate = navigate
    this.rtmChannelRef = rtmChannelRef; 
    this.rtcUid = rtcUid;
    this.currentUser= user;
    this.activeDebate = activeDebateRef;
    this.showToast=showToast;
    this.debateState = debateStateRef;
    this.changeDebateState=setDebateState

    this.changeMicControlTeam= setActiveMicControlTeam;
    this.AddActiveDebate= AddActiveDebate;
    this.setMessage = setMessage;
    this.isAudience = isAudience ;
    this.changeRoomMember=setRoomMembers;
    this.debateId = debateId;
    this.RoomMembers=RoomMembers;
    this.audioTracks = audioTracks;
    this.changeActiveSpeakers=setActiveSpeakers ;
    this.activeSpeakers = activeSpeakers ;
    this.timeRemainingRef= timeRemainingRef;
    this.setMicMuted = setMicMuted;
    this.activeMicControlTeam=activeMicControlTeam;
    this.micMuted  = micMuted;
    this.resetTranscript = resetTranscript;
    this.isLive= isLive ;
    this.SetRoomLoading=setRoomLoading ;
    this.setRtmChannelAction = setRtmChannelAction;
    this.lastApiCallConfig= lastApiCallConfig;
    this.otherState = otherState ;
    this.hasLeftRoom=hasLeftRoom;
    this.transcript= transcript;
    this.addLiveMessages= addLiveMessages;

   

  }
  getMyTeamMethod(){
    return this.activeDebate.current.teams.find((team) => team.members.find((mem) => mem._id === this.currentUser?._id));
   }

  getMemberWithHighUid(){
    let myUid = Number(this.rtcUid)
    return this.RoomMembers.find((mem)=>Number(mem.rtcUid) > myUid)
  }

  getWinnerByVote(teams){
    let teamWithLongestVote = null;
    let maxLength = 0;
  
    const teamOne = teams[0].vote.length;
    const teamTwo = teams[1].vote.length;
  
    if(teamOne===teamTwo){
      return Enums.MATCH_TIED;
    }
  
    teams.forEach(team => {
      if (team.vote.length > maxLength) {
        maxLength = team.vote.length;
        teamWithLongestVote = team.name;
      }
    });
  
      return teamWithLongestVote;
  }
  
   getTeamDataByName (teamName) {
    if (!this.activeDebate?.current) return;
    return this.activeDebate?.current.teams.find(team => team.name === teamName)

  }

  async UpdateChannelAttr(key,payload){
    const {channelId} = this.rtmChannelRef.current
    try {
      await Rtm_client.addOrUpdateChannelAttributes(channelId, {
        [key]: JSON.stringify(payload)
      })
    } catch (error) {
  console.log(error)      
    }
  }
 
  async handlePauseDebate  () {
    const { isPaused, isStarted } = this.debateState?.current;
    if (!this.RoomMembers || !isStarted || isPaused) return;
    console.log("room members before leaving",this.RoomMembers)
    const otherDebators = this.RoomMembers.filter(mem=>mem.id !== this.currentUser?._id)
    let debateRoundsPayload = {
      ...this.debateState?.current,
      changedAt: Date.now(),
      isPaused: true,
      remainingTime: this.timeRemainingRef.current
    }
    if (otherDebators.length === 0) {
      await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
    };

  }
   getTeamName(){
    if(this.activeDebate.current){
      return this.activeDebate.current.teams.map(team=>team.name)
    }
  }
  async initVolumeIndicator  () {

    //1
    AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    Rtc_client.enableAudioVolumeIndicator();

    //2
    Rtc_client.on("volume-indicator", volumes => {
      this.changeActiveSpeakers(volumes)
    })
  }

  async removIntervalFunc(){
    const { removeInterval } = this.otherState;
    if (!removeInterval) return;
    clearInterval(removeInterval?.intervalRef?.current);
    removeInterval.intervalArrRef.current = [];
  }
  async handleUserPublished  (user, mediaType)  {
    try {
      
      await Rtc_client.subscribe(user, mediaType);
      if (mediaType === "audio") {
        this.audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
        user.audioTrack.play()
      }
    } catch (error) {
      console.log(error)
    }
  }
  async handleUserLeave(theUser) {
    delete  this.audioTracks.remoteAudioTracks[theUser.uid]
  }
  async getChannelAttributeFunc(){

    if (!Rtm_client || !this.rtmChannelRef.current) return;
    try {
      
      const {channelId} = this.rtmChannelRef.current;
      const attr = await Rtm_client.getChannelAttributes(channelId);
      const  {speechText} = attr
      console.log( speechText ? JSON.parse(speechText.value):{} )
      return attr
    } catch (error) {
      
    }
  }

  async LeaveRtmChannel(){
    try {
      
      await this.RemoveMeAsASpeaker()
      await Rtm_client?.logout();
      await this.rtmChannelRef.current?.leave();
    } catch (error) {
      
    }
  }
  async closeTracks(){
    
    try {
      
      await this.addSpeechToChannel()
      await this.handlePauseDebate();
      await this.LeaveRtmChannel();
      
      if (!this.isAudience && this.audioTracks?.localAudioTracks) {
        this.audioTracks.localAudioTracks?.stop()
        this.audioTracks.localAudioTracks?.close()
      }
      if (Rtc_client) {
       await Rtc_client?.unpublish()
        await Rtc_client?.leave()
      }
    } catch (error) {
        console.log(error)
    }


  }
  async getRoomSpeaker(){
    try {
      
   
    if (Rtm_client && this.rtmChannelRef.current) {
      const res = await Rtm_client.getChannelAttributes(this.rtmChannelRef.current.channelId);
      let speakerId = res?.speaker?.value ;
      if(speakerId) {
        speakerId = JSON.parse(speakerId);  
        if(speakerId==="null"){
          return false;
        }else{
          return speakerId
        }
      }else{
        return false
      } 
    }
  } catch (error) {
      console.log(error)
  }

  }
  async RemoveMeAsASpeaker(){
    const {current:RtmChannel} = this.rtmChannelRef ;
    try {
      
   
    let speakerId = await this.getRoomSpeaker();
    if (speakerId && Rtm_client && RtmChannel) {
      if (speakerId.toString() === this.rtcUid.toString()) {
        await Rtm_client.addOrUpdateChannelAttributes(RtmChannel.channelId, {
          "speaker": "null"
        })
      }
    }
  } catch (error) {
   console.log(error)   
  }
  }
  async getChannelMembers(channel){
    if(!channel)return
    try {
      
  
    const members = await channel.getMembers()
    const uniqueMember = [...new Set(members)];
    let allMembers = await Promise.all(uniqueMember.map(async (memId) => {
      let { name, rtcUid, avatar, isAdmin, id, type } = await Rtm_client.getUserAttributes(memId, ['name', 'rtcUid', 'avatar', 'isAdmin', "id", "type"]);

      return {
        userId: memId,
        username: name,
        rtcUid,
        avatar,
        isMuted: true,
        id: id,
        type,
        isAdmin: isAdmin === "true"
      }

    }));
    return  allMembers = allMembers.filter(mem => mem.type !== "audience")
  } catch (error) {
console.log(error)
  }
  }
  async setTheSpeakerTeamToChannel(team, removeSpeakersFromChannel)  {
    if (!team ) return;


    let speakersDataPayload;
    if (removeSpeakersFromChannel) {
      speakersDataPayload = "null"
    } else {
      if (team === "both") {
        speakersDataPayload = "both"
      } else {
        const speakersIds = team.members.map(mem => mem._id)
        speakersDataPayload = {
          speakersIds,
          debateType: this.debateState.type,
          teamName: team.name,
        }
      }
    }


    
    await this.UpdateChannelAttr("speakersData",speakersDataPayload)




  }
  async handleLastApiCallForVoting(){
   const {_id,judgeType,teams} = this.activeDebate.current ;
   const winnerTeam =  this.getWinnerByVote(teams);
   const payload={
    winner:winnerTeam,
    hasEnded:true,
   }
   
   if(judgeType===Enums.AIJUDGE){
    payload.transcript =  "transcript here"
   }
   try {
     const {status,data} = await updateDebateApi(_id,payload);
     if(status ===200){
   
     }else{
      throw Error("something went wrong")
     }
   } catch (error) {
      console.log(error);
   }
  }
  async handlLastApiCallForTranscript(){
    const attribute = await this.getChannelAttributeFunc();
    let speech = attribute?.speechText?.value;
    console.log(speech)
    speech = speech ? JSON.parse(speech) : {};
    console.log("speech1",speech)
    if(!speech)return;
    const [teamOne,teamTwo] =  this.getTeamName()
     const speechOne =  speech[teamOne];
     const speechTwo = speech[teamTwo];
     let {startTime , topic  ,type ,_id } = this.activeDebate.current;
     startTime = moment(startTime).format('LLLL');

   const theArgumentext =   generateArgument({
      speechOne,
      speechTwo,
      teamOne,
      teamTwo,
      topic,
      debateType:type,
      startedTime:startTime
  })
   console.log("argument",theArgumentext)
try {
  await  chatBotApi(theArgumentext,_id)
  
} catch (error) {
}




  }
async handleLastSetup(){


    
  

  const nextUser = this.getMemberWithHighUid();
  if(nextUser)return;
  try {
    
    this.lastApiCallConfig.current.startApiCalled=true;
    await this.createChannelMessage({
      type:"start_last_api_call"
    })
    
    const {judgeType} = this.activeDebate.current;
    if(judgeType===Enums.AIJUDGE){
      await this.handlLastApiCallForTranscript()
    }else if(judgeType===Enums.VOTING){
      await  this.handleLastApiCallForVoting()
    }
    this.lastApiCallConfig.current.hasApiCalled = true;
    await this.createChannelMessage({
      type:"last_api_call_success"
    })
    
  } catch (error) {
    console.log(error) 
  }
    
  }
  
  async handleCloseDebate () {
    const { timeFormat } = this.activeDebate.current;
    let debateRoundsPayload = {
      round_shot: timeFormat.length + 1,
      speakTeam: "",
      speakTime: 0,
      isStarted: false,
      noOfRounds: timeFormat.length,
      hasFinished: true,
      startedAt: 0,
      endTime: 0,
      both: false,
      isPaused: false,
      changedAt: 0,
    }
    this.changeDebateState(debateRoundsPayload)
    this.changeMicControlTeam(null);
    if(this.getMemberWithHighUid())return;
try {
  await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
  await this.setTheSpeakerTeamToChannel(null , true)
  await this.handleLastSetup()
} catch (error) {
  console.log(error)
}
  }

async handleMemberJoined   (MemberId)  {

  try {
    

  let { name, rtcUid, avatar, isAdmin, id, type } = await Rtm_client.getUserAttributes(MemberId, ['name', 'id', 'rtcUid', 'avatar', 'isAdmin', 'type'])
  const doesUserExist = this.RoomMembers.find(mem => mem.id === id)
  if (type === "audience") return;
  if (!doesUserExist) {

    this.changeRoomMember(mem => ([
      ...mem,
      {
        userId: MemberId,
        username: name,
        rtcUid,
        avatar,
        isMuted: true,
        id,
        isAdmin: Boolean(isAdmin)
      }
    ]))
    

  }

} catch (error) {
    console.log(error)
}



}
async addParticipant()  {
  if(this.isAudience)return;
    try {
     await joinParticipantApi(this.activeDebate?.current._id, {
        participantId: this.currentUser?._id
      })
    } catch (error) {
      console.log(error)
    }
}
async handleMemberLeft (MemberId)  {
  this.changeRoomMember(mem => mem.filter(m => m.userId !== MemberId))
}
async handleChannelMessage  (message)  {

  const data = JSON.parse(message.text);
    console.log("incoming",data)
  if (data.type === "resume_debate") {
    this.changeDebateState(data)
  } else if (data.type === "live_chat") {
    delete data.type;
    console.log("adding message",this.setMessage)
    this.addLiveMessages(data)
  } else if (data.type === "live_vote") {
    delete data.type;
    this.activeDebate.current = data;
    this.AddActiveDebate(this.activeDebate)
  }else if(data.type==="last_api_call_success"){
    this.lastApiCallConfig.current.hasApiCalled=true
  }else if(data.type==="debate_start"){
    const {rounds,speakers} = data;
    if(rounds.isMicPassed){
     await this.removIntervalFunc();
    }
    this.changeDebateState(rounds);
    this.changeMicControlTeam(speakers)
  }else if(data.type==="start_last_api_call"){
    console.log("start now")
    this.lastApiCallConfig.current.startApiCalled=true;
  }
}
async InitRTM({token}){

  try {
    const {_id,avatar,firstName,lastName}   =  this.currentUser;
    const {admin:{_id:adminId}} = this.activeDebate.current
    let rtcUid = this.rtcUid.toString();
    let isAdmin  = _id === adminId
    await Rtm_client.login({ uid:rtcUid, token });
    if (this.isAudience) {
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": "audience", "rtcUid": rtcUid, 'avatar': "audience", "id": "audience", "type": "audience", "mic": "muted" });
    } else {
      await Rtm_client.addOrUpdateLocalUserAttributes({
         "name": `${firstName} ${lastName}`,
          "rtcUid": rtcUid, 
          'avatar': avatar, 
          "id": _id, 
          "type": "host",
           'isAdmin':  `${isAdmin}`,
           "mic": "muted" });
      await this.addParticipant()
    }
    const channel = Rtm_client.createChannel(this.debateId);
    channel.on("MemberJoined",(memId)=> this.handleMemberJoined(memId))
    channel.on("MemberLeft", (memId)=> this.handleMemberLeft(memId));
    channel.on("ChannelMessage", (message)=> this.handleChannelMessage(message))
    this.setRtmChannelAction(channel)
    this.rtmChannelRef.current = channel;
    await channel.join()
    this.setChannelMember(channel);
  } catch (error) {
console.log("error",error)  
  }
}

async setChannelMember(channel){
    if (!channel) return;
    try {
      
      const allMembers =  await this.getChannelMembers(channel)
      this.changeRoomMember(allMembers)
    } catch (error) {
      
    }
}
async initRTC  (token)  {
  try {

  await Rtc_client.join(process.env.REACT_APP_AGORA_APP_ID, this.debateId, token, this.rtcUid);
  Rtc_client.on("user-published", (user,mediaType)=> this.handleUserPublished(user,mediaType));
  Rtc_client.on("user-left",(user)=> this.handleUserLeave(user));
  if (!this.isAudience) {
    this.audioTracks.localAudioTracks = await AgoraRTC.createMicrophoneAudioTrack()
    this.audioTracks.localAudioTracks.setMuted(true)
    await Rtc_client.publish(this.audioTracks.localAudioTracks);
  }
  await this.initVolumeIndicator();
        
} catch (error) {
      console.log(error)
}
}

async getAgoraToken() {
  try {
    this.SetRoomLoading(true)
    const res = await getAgoraTokenApi({ channelName: this.debateId, role: "publisher", uid: this.rtcUid, tokentype: "1000", expiry: 86400 })
  if (res.status === 200) {
    let { rtcToken, rtmToken } = res.data;
    if (this.isLive) {
      await this.initRTC(rtcToken);
      await this.InitRTM({ rtmToken });
      this.SetRoomLoading(false)
    }
  }
} catch (error) {
  
}
}
async createChannelMessage(message)  {
  if(!this.rtmChannelRef.current)return;
  try {
    await this.rtmChannelRef.current.sendMessage({ text: JSON.stringify(message) })
    
  } catch (error) {
    console.log(error)
  }
}
async handleResumeDebate ()  {

  if(!this.debateState.current)return;
  try {
    
 
  const { isPaused, isStarted } = this.debateState.current;
  if (!isStarted || !isPaused) return;
  const debateRoundsPayload = {
    ...this.debateState.current,
    isPaused: false,
    changedAt: Date.now()
  };

  this.changeDebateState(debateRoundsPayload);
  await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
  await this.createChannelMessage({ ...debateRoundsPayload, type: "resume_debate" })
} catch (error) {
    console.log(error)
}


}
async checkIfUserAlreadyExist(){
}
async checkIfUserCanUnMute (){
  if (!this.activeMicControlTeam) return;

  if (this.activeMicControlTeam === "both") {
    return true;
  }

  const myTeam =this.getMyTeamMethod().name;
  if (this.activeMicControlTeam.name !== myTeam) {
    this.showToast("Next team has  mic control", "error");
    return false;
  }     
  console.log(await this.getRoomSpeaker())
  if (await this.getRoomSpeaker()) {
    this.showToast("Someone else is speaking", "error");
    return false;
  }else{
    return true;
  }
    



}
async handleMicTogggle  () {
  try {
    

  if (this.micMuted) {
    if (!await this.checkIfUserCanUnMute()) {
      return;
    };
    this.audioTracks.localAudioTracks.setMuted(false)
    this.setMicMuted(false)
    await this.UpdateChannelAttr("speaker",this.rtcUid.toString())
    await  SpeechRecognition.startListening()
  }
  else {
    this.audioTracks.localAudioTracks.setMuted(true);
    this.setMicMuted(true)
    await this.UpdateChannelAttr("speaker","null")
    await this.addSpeechToChannel()
  }
} catch (error) {
    console.log(error)
}
}

async handleDebateInitChange  (nextround, isMicPassed,isStarted)  {


  try {
  if (!this.activeDebate.current) return;
  const { timeFormat } = this.activeDebate.current;
  const { team: teamName, time } = timeFormat[nextround - 1];
  const team = this.getTeamDataByName(teamName);

  let debateRoundsPayload = {
    round_shot: nextround,
    speakTeam: teamName,
    speakTime: time,
    isStarted: true,
    noOfRounds: timeFormat.length,
    changedAt: Date.now(),
    hasFinished: false,
    remainingTime: time * 60 * 1000,
    startedAt: Date.now(),
    isPaused: false,
    both: teamName === "both",
    isMicPassed: isMicPassed ?? false
  }
  this.changeDebateState(debateRoundsPayload);
  this.changeMicControlTeam(team ?? "both");
  
  if(isStarted || isMicPassed ){
    let startPayload={
      type:"debate_start",
      rounds:debateRoundsPayload,
      speakers:team ?? "both"
    }
  
    await this.createChannelMessage(startPayload)
  }
  
  if(!await this.getMemberWithHighUid() || isStarted ){
    await this.UpdateChannelAttr("debateRounds", debateRoundsPayload);
    await this.setTheSpeakerTeamToChannel(team ?? "both");
  };
     
} catch (error) {
    console.log(error)
}
}
async addSpeechToChannel(){
  
  try {
  if(!this.currentUser || this.activeDebate.current?.judgeType !== Enums.AIJUDGE || !this.transcript)return;

  const attr =  await this.getChannelAttributeFunc();

  let  speechText = attr?.speechText?.value;
  const thePast = speechText ? JSON.parse(speechText) : {}
  const myTeam = this.getMyTeamMethod().name;
  console.log("transcript",this.transcript);
  
  let teamSpeech;
  if(thePast[myTeam]){
    teamSpeech  = thePast[myTeam];
    teamSpeech   = `${teamSpeech} ${this.transcript}`;
  }else{
    teamSpeech=this.transcript;
  }

  let newArguments={
    ...thePast,
    [myTeam]:teamSpeech
  }

    
    
    await this.UpdateChannelAttr("speechText",newArguments)
  } catch (error) {
    
  }

} 
async handleFinishSpeakTime(isMicPassed)  {
  const { timeFormat ,judgeType } = this.activeDebate.current;
  let debateShot = this.debateState.current.round_shot;
  let totalShot = timeFormat?.length
  let nextRoundShot = ++debateShot;
  console.log("the currrent round" , this.debateState.current.round_shot ,nextRoundShot)
  try {
 
  if(!this.micMuted){
   await this.handleMicTogggle()
  }
  if (nextRoundShot > totalShot) {
    await this.handleCloseDebate()
  } else {
   await this.handleDebateInitChange(nextRoundShot, isMicPassed)
  }
  if(judgeType===Enums.AIJUDGE){
  await  this.addSpeechToChannel()
  }
} catch (error) {
console.log(error)
}
}

async startDebate() {
  await this.handleDebateInitChange(1,null,true)
}


async handleLeaveRoom  () {
  try {
    
    this.hasLeftRoom.current = true
    await this.closeTracks()
    this.navigate(-1)
  } catch (error) {
    console.log(error)
  }
}


async AmIParticipants(){
if(!this.activeDebate?.current || !this.currentUser)return
 return this.activeDebate.current.teams.some(team=>team.members.some(mem=>mem._id ===this.currentUser?._id));
  
}
}

export  { DebateRoomServices}








