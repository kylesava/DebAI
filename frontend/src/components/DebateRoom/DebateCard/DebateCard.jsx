import { Avatar, AvatarGroup, useToast } from "@chakra-ui/react";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import "./DebateCard.css";
import { deleteDebateApi } from "../../../utils/Api";

const DebateCard = ({ debate, isLive }) => {
  const location = useLocation().pathname.split("/")[1];
  const [isParticipant, setIsParticipant] = useState(null);
  const { data } = useSelector((state) => state.user);
  const [participants, setParticipants] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    let isParticipant = debate.teams.some((team) =>
      team.members.some((member) => member._id === data?._id)
    );
    if (!isParticipant) {
      setIsParticipant(false);
    } else {
      setIsParticipant(true);
    }
  }, [debate, data]);

  useEffect(() => {
    if (!debate) return;
    let result = debate.teams.reduce((acc, team) => {
      team.members.forEach((person) => {
        acc.push(person);
      });
      return acc;
    }, []);
    setParticipants(result);
  }, [debate]);

  const handleDeleteDebate = async () => {
    if (!debate?._id) return;
    try {
      const res = await deleteDebateApi(debate._id);
      if (res.status === 200) {
        toast({
          description: "Debate deleted successfully",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  // Return a cleanup function to clear the interval when the component unmounts

  const handleParticipateInDebate = () => {
    navigate(`/debate/${debate?.passcode}`, {
      state: debate,
    });
  };

  return (
    <div className="DebateCardWrapper">
      <div className="card_top_box">
        <h5 className="debate_topic">{debate.topic}</h5>
        {/* <AvatarGroup
          className="participants_avatar_group"
          size="md"
          max={participants.length - 1}
        >
          {participants.map((participant) => (
            <Avatar
              key={participant?._id}
              referrerPolicy="no-referrer"
              className="avatars participantsAvatar"
              name={participant.firstName}
              src={participant.avatar}
            />
          ))} */}
        <AvatarGroup size="md" max={participants.length - 1}>
          {participants.map((participant) => (
            <Avatar
              key={participant?._id}
              referrerPolicy="no-referrer"
              className="avatars"
              name={participant.firstName}
              src={participant.avatar}
            />
          ))}
        </AvatarGroup>
      </div>
      <div className="debate_card_bottom">
        <div className="debate_more_details">
          <div className="debate_details_left">
            <div className="info_key">
              <div className="debate_card_info_box">
                <img width="96" height="96" src="https://img.icons8.com/fluency/96/diversity.png" alt="diversity"/>
              <p>Debate Type</p>
              </div>
               <p className="info_value"> {debate.type}</p>

            </div>
            <div className="info_key">
              <div className="debate_card_info_box">
                <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/administrator-male--v1.png" alt="administrator-male--v1"/>
              <p>Debate Admin</p>{" "}
              </div>
              <p className="info_value">
                {debate.admin?.firstName} {debate.admin?.lastName}
              </p>
            </div>
          
          </div>
          <div className="debate_details_right">

            <div className="info_key started_time">
              {isLive ? (
                <>
                <div className="debate_card_info_box">
                  <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/alarm-clock--v2.png" alt="alarm-clock--v2"/>
                  <p>Started </p>
                </div>
                  <p>{format(debate.startTime)}</p>
                </>
              ) : (
                <>
                <div className="debate_card_info_box">
                  <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/alarm-clock--v2.png" alt="alarm-clock--v2"/>
                  <p>Starts At </p>
                </div>
                  <p>{moment(debate.startTime).format("LLL")}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="debate_button_box">
          {data?._id === debate?.admin?._id && location === "profile" && (
            <button onClick={handleDeleteDebate} className="delete_debate_btn">
              <MdDeleteOutline />
              <p>Delete</p>
            </button>
          )}

      {
        isParticipant === false?
        <Link
        to={`${
              debate.hasEnded
                ? `/completion/${debate?._id}`
                : `/debate/${debate?.passcode}?audience=${true}`
            }`}
            state={{ debate }}
          >
            <button>

              <MdOutlineViewInAr /> <p>Join </p>{" "}
            </button>
          </Link> : ""

            } 
          {  isParticipant ===true ? (
            <button onClick={handleParticipateInDebate}>
              {" "}
              <AiOutlineUsergroupAdd /> <p>Participate</p>{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateCard;
