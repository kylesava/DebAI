import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import MessageInput from '../../ChatBox/MessageInput/MessageInput'
import MessageText from '../../ChatBox/MessageText'
import "./LiveChat.css"
import { createChatApi, findChatApi } from '../../../utils/Api';
import { bindActionCreators } from 'redux';
import {IoChatbubblesSharp} from "react-icons/io5"
import { actionCreators } from '../../../redux/store';
const LiveChat = () => {

  const dispatch = useDispatch()
  const {data} = useSelector(state=>state.user)
  const {activeDebate} =useSelector(state=>state.debate)
  const {liveMessage} = useSelector(state=>state.chat)
  const {addLiveMessages ,setLiveMessages} =bindActionCreators(actionCreators,dispatch )
  const {rtmChannel,RoomService} = useSelector(state=>state.other);
  const inputRef = useRef()
  const scrollRef = useRef()
  console.log(liveMessage)
  useEffect(()=>{
    if(!activeDebate?.current)return ;
    
    handleGetAllChats()
  },[activeDebate?.current])

  const handleGetAllChats = async()=>{

    const {_id} = activeDebate?.current
    try {
        const res = await findChatApi(_id);
        if(res.status===200){
          const {message} = res.data 
          setLiveMessages(message)
        }else{
          throw Error(res.data?.message)
        }
    } catch (error) {
      console.log(error)
    }

  }
  const handleSendMessage=async(msgText,cb)=>{

    const newChat ={
      owner:data?._id,
      debate:activeDebate?.current?._id,
      text:msgText
    }
      try {

          const res = await createChatApi(newChat );
          const {message} = res?.data
          if(res.status===200){
            addLiveMessages(message)
             await sendRtmChannelMessage(message)
             cb()
          }else{
            throw Error(message)
          }
      } catch (error) {
          console.log(error)
      }

  }

  useEffect(()=>{
    scrollRef.current.scrollTo(0,scrollRef.current.scrollHeight);
  },[liveMessage])
 

  const sendRtmChannelMessage=async(data)=>{
    data.type="live_chat"
    console.log("sending",rtmChannel.current ,RoomService)
    if(RoomService){
      console.log("inside",RoomService  )
      // await rtmChannel.current.sendMessage({ text: JSON.stringify(data) })
   await   RoomService.createChannelMessage(data)
  }
  }

  return (
    <div className='LiveChatWrapper' >
      <div className="live_chat_header">
      <IoChatbubblesSharp/>
        <h2>LIVE CHATS</h2>
      </div>
      <div  ref={scrollRef} className='live_chat_message_list'>
      {
        liveMessage &&
        liveMessage.map((message)=>(
        <div  key={message?._id  }>

        <MessageText    message={message}  own={message?.owner?._id === data?._id}/>
        </div>
      ))
 
      }
      </div>
      <MessageInput  inputRef={inputRef} isLiveChat={true}  handleSendMessage={handleSendMessage}/>
    </div>
  )
}

export default LiveChat