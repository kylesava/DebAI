import { ActionTypes } from "../action/actionTypes/ActionTypes";




const INTIAL_CHATSTATE = {
    setMessage:null,
    liveMessage:[],
    
}

const ChatReducer = (state = INTIAL_CHATSTATE, action) => {

    switch (action.type) {
        case ActionTypes.SET_MESSAGE_ARR:
            return { ...state, setMessage: action.payload }

        case ActionTypes.SET_LIVE_MESSAGES:
            return {...state,liveMessage:action.payload}

        case ActionTypes.ADD_LIVE_MESSAGE:
            console.log(action.payload)
            return {...state,liveMessage: [...state.liveMessage,action.payload] }

        default:
            return state
    }



}

export default ChatReducer;