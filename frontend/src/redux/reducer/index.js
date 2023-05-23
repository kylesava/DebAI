import { combineReducers } from "redux"
import DebateReducer from "./DebateReducer";
import OtherReducer from "./OtherReducer";
import UserReducer from "./UserReducer"
import ChatReducer from "./ChatReducer";

const reducers = combineReducers({
    chat: ChatReducer,
    user:  UserReducer,
    other:  OtherReducer,
    debate:  DebateReducer,
})
export default reducers;



