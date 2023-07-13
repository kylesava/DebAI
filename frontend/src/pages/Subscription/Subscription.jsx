import React, { useEffect, useState } from "react";
import { Tag, Popconfirm } from "antd";
import { useToast } from "@chakra-ui/react";
import Navbar from "../../Layouts/Navbar/Navbar";
import {
  getPrices,
  setStripeSession,
  cancelSubscriptionApi,
  getLoggedInUserApi,
} from "../../utils/Api";
import "./Subscription.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/store";
import { useNavigate ,useLocation} from "react-router-dom";

const Subscription = () => {
  const [prices, setPrices] = useState([]);
  const [subStatus, setSubStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch()
  const location = useLocation() 
  const { data: loggedInUserData } = useSelector((state) => state.user);
  const toast = useToast();
  const {SetRefreshNow} = bindActionCreators(actionCreators,dispatch)
  console.log("HELO",location)
  const fetchPrices = async () => {
    const { data: response, status } = await getPrices();
    if (status !== 200) throw Error(response.message);
    setPrices(response.data);
  };

  useEffect(() => {
    fetchPrices();
    setSubStatus(loggedInUserData?.subscription?.status);
  }, [loggedInUserData?.subscription?.status]);



  const createSession = async (priceId) => {
    const prevPath  =location.state?.from

    const { data: response, status } = await setStripeSession({
      priceId: priceId,
      userId: loggedInUserData._id,
      redirectUrl: `${process.env.REACT_APP_FRONTEND_URL}`,
    });

    if (status !== 200) throw Error(response.message);
    window.location.href = response.url;
    // navigate(-1)
  };

  const cancelSubscription = async () => {
    const { data: response, status } = await cancelSubscriptionApi({
      subscriptionId: loggedInUserData.subscription.subscriptionId,
    });
    if (status !== 200) throw Error(response.message);
    const res = await getLoggedInUserApi();
  
    if (res.status === 200) {
      setSubStatus(res.data.message.subscription.status);
      setOpen(false);
      setConfirmLoading(false);
      SetRefreshNow()
      // AddLoggedInUser
    }
    toast({
      title: "",
      description: "Subscription has been canceled successfully",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showPopconfirm = () => {
    setOpen(true);
  };
  return (
    <>
      <Navbar />
      <div className={"subscription_container"}>
      <div className="subscription_header_box">
      <img width="64" height="64" src="https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/64/external-discount-coupons-at-a-shopping-mall-store-for-reasonable-pricing-in-sales-mall-tritone-tal-revivo.png" alt="external-discount-coupons-at-a-shopping-mall-store-for-reasonable-pricing-in-sales-mall-tritone-tal-revivo"/>
        <h1>Choose Your Plan</h1>
        </div>  
        <div class="pricing">
          <div class="pricing-plan">
            <h2 className="plan_name">Basic</h2>
            <p>
              <span>Free</span>
            </p>
            <ul>
              <li>Watch Debate</li>
              <li>Live Chat on Debate</li>
              <li>Vote on Debate</li>
            </ul>
          </div>

          {prices.map((price) => (
            <div class="pricing-plan" key={price.key}>
              <div className="plan_main_content_box">

              <h2 className="plan_name">
                {price.nickname}                
              </h2>
              <h3>
                {subStatus === "active" &&
                  loggedInUserData?.subscription?.plan ===
                    price.recurring?.interval && (
                    <Tag color="green">Current Plan</Tag>
                  )}
              </h3>
              <p>
                <span>£{price.unit_amount / 100}</span> /{" "}
                {price.recurring?.interval}
              </p>
              <ul>
                <li>Watch Debate</li>
                <li>Live Chat on Debate</li>
                <li>Vote on Debate</li>
                <li>Take Part in Debate</li>
                <li>Create Debate</li>
              </ul>
              </div>
              {subStatus === "active" &&
              loggedInUserData?.subscription?.plan ===
                price.recurring?.interval ? (
                <Popconfirm
                  title="Cancel Subscription"
                  description="Are you sure, you want to cancel?"
                  open={open}
                  onConfirm={cancelSubscription}
                  okButtonProps={{
                    loading: confirmLoading,
                  }}
                  okText="Yes"
                  cancelText="No"
                  onCancel={handleCancel}
                >
                  <a onClick={showPopconfirm}>Cancel Plan</a>
                </Popconfirm>
              ) : (
                <button onClick={() => createSession(price.id)}>Buy Now</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscription;
