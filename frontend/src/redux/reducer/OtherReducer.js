import { ActionTypes } from "../action/actionTypes/ActionTypes"


const INITIAL_OTHER_STATE = {
    rtmChannel:null,
    isLoading: false,
    refresh: false,
    removeInterval:null,
    RoomService:null,

}

const OtherReducer = (state = INITIAL_OTHER_STATE, action) => {

    switch(action.type) {

        case ActionTypes.SET_IS_LOADING:
            return { ...state, isLoading: true }

        case ActionTypes.SET_IS_NOT_LOADING:
            return { ...state, isLoading: false }

         case ActionTypes.SET_REFRESH:
                return { ...state, refresh: !state.refresh }

         case ActionTypes.SET_REMOVE_INTERVAL_FUNC:
               return { ...state,   removeInterval : action.payload}
        
        case ActionTypes.SET_ROOM_SERVICE:
            console.log('setting room',action.payload)
            return {...state, RoomService : action.payload}

        case ActionTypes.SET_RTM_CHANNEL:
           
            return { ...state, rtmChannel:action.payload} 

        
   


        default:
            return state
    }



}

export default OtherReducer;