import { changeVote } from "../../utils/services";
import { ActionTypes } from "../action/actionTypes/ActionTypes";
import { Enums } from "../action/actionTypes/Enumss";
const INITIAL_DEBATE_STATE = {
  activeDebate: null,
  currentDebateTab: Enums.UPCOMING_TAB,
  isUserParticipant: null,
  isLive: null,
  activeParticipants: [],
  streamRef: null,
  roomLoading: false,
  votedTeam: null,
  teamsName: null,
  pastDebates: [],
  futureDebates: [],
  invitationDebates: [],
};

const DebateReducer = (state = INITIAL_DEBATE_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_DEBATE:
      return { ...state, activeDebate: action.payload };

    case ActionTypes.REMOVE_ACTIVE_DEBATE:
      return { ...state, activeDetails: null };

    case ActionTypes.SET_UPCOMING_DEBATE_TAB:
      return { ...state, currentDebateTab: Enums.UPCOMING_TAB };

    case ActionTypes.SET_LIVE_DEBATE_TAB:
      return { ...state, currentDebateTab: Enums.LIVE_TAB };

    case ActionTypes.SET_IS_USER_PARTICIPANT:
      return { ...state, isUserParticipant: action.payload };

    case ActionTypes.SET_IS_LIVE:
      return { ...state, isLive: action.payload };

    case ActionTypes.SET_ACTIVE_PARTICIPANTS:
      return { ...state, activeParticipants: action.payload };

    case ActionTypes.ADD_STREAM_REF:
      return { ...state, streamRef: action.payload };

    case ActionTypes.SET_ROOM_LOADING:
      return { ...state, roomLoading: action.payload };

    case ActionTypes.SET_VOTED_TEAM:
      return { ...state, votedTeam: action.payload };

    default:
      return state;
  }
};
export default DebateReducer;
