import axios from "axios";
import { axiosInstance } from "./axios";

//USER API ENDPOINTS
export const RegisterUserApi = (data) =>
  axiosInstance.post("/auth/register", data);
export const LoginUserApi = (data) => axiosInstance.post("/auth/login", data);
export const getLoggedInUserApi = () =>
  axiosInstance.get("/user/getLoggedInUser");
export const logoutApi = () => axiosInstance.post("/auth/logout");
export const searchUserByNames = (username) =>
  axiosInstance.get(`/user/search?search_query=${username}`);
export const searchUserByIdApi = (userId) =>
  axiosInstance.get(`/user/search?userId=${userId}`);

export const getTopUsersApi = ()=> axiosInstance.get("/user/leadingDebators")
export const emailConfirmationApi=(code)=>axiosInstance.post(`/auth/email_confirmation/${code}`)
export const resetpasswordApi =(token,data)=>axiosInstance.post(`/auth/resetpassword/${token}`,data)
export const checkIfTokenIsValidApi = (token)=>axiosInstance.post(`/auth/tokenvalid/${token}`)
export const resentLinkToResetPasswordApi=(email)=>axiosInstance.post(`/auth/sentLinkToResetPassword`,{email})
export const sentEmailToVerifyEmailApi=(email)=>axiosInstance.post(`/auth/sentEmailToVerifyEmail`,{email})
// DEBATE API ENDPOINTS
export const getIsPassocodeUniqueApi = (passcode) =>
  axiosInstance.post("/debate/checkPasscode", { passcode });
export const createDebateApi = (data) => axiosInstance.post("/debate", data);
export const getDebateByIdApi = (debateId) =>
  axiosInstance.get(`/debate?_id=${debateId}`);
export const getDebateByPassocde = (passcode) =>
  axiosInstance.get(`/debate?passcode=${passcode}`);
export const getCurrentDebateApi = () =>
  axiosInstance.get(`/debate?live=${true}`);
export const getAllDebateApi = () =>
  axiosInstance.get(`/debate?upcoming=${true}`);
export const getDebateOfUserApi = (userId) =>
  axiosInstance.get(`/debate?admin=${userId}`);
export const getAgoraTokenApi = ({
  channelName,
  role,
  tokentype,
  uid,
  expiry,
}) =>
  axiosInstance.get(
    `/auth/rte/${channelName}/${role}/${tokentype}/${uid}/?expiry=${expiry}`
  );
export const deleteDebateApi = (debateId) =>
  axiosInstance.delete(`/debate/${debateId}`);
export const getUsersDebateCountApi = (userId) =>
  axiosInstance.get(`/debate/counts/${userId}`);
export const joinParticipantApi = (debateId, data) =>
  axiosInstance.post(`/debate/joinParticipant/${debateId}`, data);
export const removeParticipantApi = (debateId, data) =>
  axiosInstance.post(`/debate/removeParticipant/${debateId}`, data);
export const getSingleDebateApi = (debateId) =>
  axiosInstance.get(`/debate/singleDebate/${debateId}`);

// subscription api
export const getPrices = () => axiosInstance.get(`/user/prices`);
export const setStripeSession = (data) =>
  axiosInstance.post(`/user/setStripeSession`, data);
export const cancelSubscriptionApi = (data) =>
  axiosInstance.post(`/user/cancelSubscription`, data);

// chat bot api

// chat bot api
export const getBotMessageApi = (data) => axiosInstance.post("/chatbot", data);
export const updateUserapi = (userId, data) =>axiosInstance.put(`/user/${userId}`, data);

// live chat api
export const createChatApi = (data) => axiosInstance.post("/chat/create", data);
export const findChatApi = (debateId) =>
  axiosInstance.get(`/chat/find?debate=${debateId}`);
export const chatBotApi = (prompt,debateId ,teams) =>
  axiosInstance.post(`/chat/chatbot?debateId=${debateId}`, {
    prompt,
    teams
  });

// vote and unvote

export const voteTeamApi = (data) => axiosInstance.post("/debate/vote", data);
export const unVoteTeamApi = (data) =>
  axiosInstance.post("/debate/unVote", data);
export const voteAndUnvoteTeamApi = (data) =>
  axiosInstance.post("/debate/voteAndUnvote", data);

// debates
export const getPastDebatesOfCurrentUserApi = (data) =>
  axiosInstance.get(`/debate/${data.userId}?future=${data.future}`);
export const getFutureDebatesOfCurrentUserApi = (data) =>
  axiosInstance.get(`/debate/${data.userId}?future=${data.future}`);
export const getInvitationDebatesOfCurrentUserApi = (data) =>
  axiosInstance.get(`/debate/${data.userId}?invitation=${data.invitation}`);
export const updateDebateApi=(debateId,data)=>axiosInstance.put(`/debate/${debateId}`,data)
export const addAvatarEquipedMembersInDebate=(debateId,userId)=>axiosInstance.put(`/debate/addAvatarEquipedMembersInDebate/${debateId}/${userId}`)
export const finishDebateApi=(debateId,data)=>axiosInstance.post(`/debate/debateEnd/${debateId}`,data)

//MOTION API
export const getAllMotionCategoryApi=()=>axiosInstance.get(`/motion/allcats`);
export const getMotionOfType=(typeId,group)=>axiosInstance.get(`/motion/alltypes?typeId=${typeId}&group=${group}`)
export const addNewMotionApi=(data)=>axiosInstance.post(`/motion/addmotion`,data);
export const addCommentOnMotionApi=(motionId,data)=>axiosInstance.post(`/motion/comment/${motionId}`,data)


// GET COUNTRIES API

export const getCountries=()=>axios.get("https://restcountries.com/v3.1/all");
