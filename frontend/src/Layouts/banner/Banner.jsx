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

      <div className="banner_content">
        <p className="top_site_info">Virtual Debate platform</p>
        <div>
          <h1 className="main_text_banner">
            Online platform to organize a virtual debate for all
          </h1>
        </div>
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,112C1120,64,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
  );
};

export default Banner;
