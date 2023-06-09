import { MdOutlineAdd, MdModelTraining } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import "./Banner.css";
import DebatePasscodeInput from "../../components/DebateForm/TeamForm/DebatePasscodeInput/DebatePasscodeInput";
const Banner = () => {
  const [debateLink, setdebateLink] = useState("");
  const { data: userData } = useSelector((state) => state.user);
  const [validLink, setValidLink] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    let id = debateLink?.split("?")[1]?.split("=")[1];
    if (id) {
      setValidLink(true);
    } else {
      setValidLink(false);
    }
  }, [debateLink]);

  const handleWatch = () => {
    if (!validLink) {
      toast({
        title: "",
        description: "Invalid Debate Link",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    if (debateLink) {
      let debateId = debateLink.split("=")[1];
      navigate(`/watch?debateId=${debateId}`);
    }
  };
  const handleCreateDebate = () => {
    if (!userData) {
      navigate("/login");
      handleShowToastBar("You need to login first ");
    } else {
      navigate(`/create`);
    }
  };
  const handleShowToastBar = (text) => {
    toast({
      title: "",
      description: text,
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  };
  return (
    <div className="BannerWrapper">
      <img className="robo roboLeft" src="/images/robo1.png" alt="roboImg" />
      <img className="robo roboRight" src="/images/robo2.png" alt="roboImg" />
      {/* <img className="logo_second" src="/images/banner_logo.jpeg" alt="logo2" /> */}

      <div className="banner_content">
        {/* <p className="top_site_info">Virtual Debate platform</p> */}

          <h1 className="main_text_banner">
            Online platform to organize a virtual debate for all
          </h1>
    
        <div className="bottom_text">
          <p className="secondary_main_banner_text">
            Debatasour lets a users to create a online debate and manages the
            audience to watch the debate & provide feedback to the debators.
          </p>
        </div>
      </div>
      <div className="banne_bottom_option_box">
        <button
          onClick={handleCreateDebate}
          className="banner_bottom_button_option_button"
        >
          <MdOutlineAdd />
          <p>Create Debate</p>
        </button>

        <Link to="/chatbot">
          <button className="prepare_for_debate_btn">
            <MdModelTraining />
            <p>Prepare For Debate</p>
          </button>
        </Link>
      </div>
      <DebatePasscodeInput />
    </div>
  );
};

export default Banner;
