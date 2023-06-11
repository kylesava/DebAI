import { useRef } from "react";
import "../Auth.css";
import {
  emailConfirmationApi,
  sentEmailToVerifyEmailApi,
} from "../../../utils/Api";
import { useToast } from "@chakra-ui/react";

const VerifyEmail = () => {
  const toast = useToast();
  const emailRef = useRef();
  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const { status } = await sentEmailToVerifyEmailApi(
        emailRef.current.value
      );
      if (status === 200) {
        handleShowAlert("Verify link is sent to your email", "success");
      }
    } catch (error) {
      const data = error?.response?.data;
      handleShowAlert(data?.message, "error");
    }
  };

  const handleShowAlert = (text, type) => {
    toast({
      title: "",
      description: text,
      status: type,
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <div className="verify_email_page">
      <div className="verify_image_wrapper">
        <img src="/images/verify.png" alt="verify" />
      </div>
      <div className="verify_content_box">
        <div className="verify_main_content">
          <form onSubmit={handleSendEmail} className="email_sent_content_box">
            <div className="email_verify_top_head">
              <p className="email_sent_alert_box">Verify your email .</p>
              <p className="email_desc">
                Check you email we will sent an email that contains a link to
                verify your email address.
              </p>
            </div>
            <input
              ref={emailRef}
              placeholder="your email address to verify"
              type="email"
              required
            />

            <button className="verify_email_button" type="submit">
              SEND EMAIL
            </button>
            <small className="resent_email_expires_time">
              Did not receive the email ? Check your spam filter or try again
              with another email.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
