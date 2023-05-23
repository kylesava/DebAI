import { ActionTypes } from "../actionTypes/ActionTypes";

export const AddLoggedInUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADDUSER,
      payload: user,
    });
  };
};
export const RemoveLoggedInUser = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVEUSER,
    });
  };
};
export const AddToastRef = (toastRef) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_TOAST_REF,
      payload: toastRef,
    });
  };
};
export const setIsLoading = (isLoading) => {
  console.log("loading action", isLoading);
  return (dispatch) => {
    if (isLoading) {
      dispatch({
        type: ActionTypes.SET_IS_LOADING,
      });
    } else {
      dispatch({
        type: ActionTypes.SET_IS_NOT_LOADING,
      });
    }
  };
};
export const AddActiveDebate = (debate) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_DEBATE,
      payload: debate,
    });
  };
};
export const removeActiveDebate = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ACTIVE_DEBATE,
    });
  };
};
export const AddLiveDebateTab = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_LIVE_DEBATE_TAB,
    });
  };
};
export const AddUpcominggDebateTab = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_UPCOMING_DEBATE_TAB,
    });
  };
};

export const SetIsUserParticipant = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_USER_PARTICIPANT,
      payload,
    });
  };
};

export const SetRoomIsLiveOrNot = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_LIVE,
      payload,
    });
  };
};
export const SetActiveParticipants = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_PARTICIPANTS,
      payload,
    });
  };
};
export const AddStreamRef = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_STREAM_REF,
      payload,
    });
  };
};
export const SetRefreshNow = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_REFRESH,
    });
  };
};
export const SetRoomLoading = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ROOM_LOADING,
      payload,
    });
  };
};
export const setRemoveIntervalFunc = (payload) => {
  console.log("settinginit", payload);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_REMOVE_INTERVAL_FUNC,
      payload,
    });
  };
};
export const setRtmChannelAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_RTM_CHANNEL,
      payload,
    });
  };
};

export const setMessageArrAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_MESSAGE_ARR,
      payload,
    });
  };
};

export const setVotedTeamAction = (payload) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_VOTED_TEAM,
    payload,
  });
};
export const set_update_vote = (payload) => (dispatch) => {
  console.log("SETTING", payload);
  dispatch({
    type: ActionTypes.SET_CHANGE_VOTE,
    payload,
  });
};

export const setRoomService=(payload)=>(dispatch)=>{
  dispatch({
    type:ActionTypes.SET_ROOM_SERVICE,
    payload
  })

}
  export const setLiveMessages=(payload)=>(dispatch)=>{
    dispatch({
      type:ActionTypes.SET_LIVE_MESSAGES,
      payload
    })
}
  export const addLiveMessages=(payload)=>(dispatch)=>{
    dispatch({
      type:ActionTypes.ADD_LIVE_MESSAGE,
      payload
    })
}