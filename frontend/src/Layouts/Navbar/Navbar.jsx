import React from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import SignOutPopover from "../popovers/SignoutPopovers"
import "./Navbar.css"

const Navbar = () => {
  const { data } = useSelector((state) => state.user)
  const location = useLocation().pathname



  return (
    <div className="NavbarWrapper" >
      <Link to={"/"}>
        <div className="nav_logo_box">
          <img className="navLogo" src="/images/logo.jpg" alt="logoImg" />
        </div>
      </Link>
      <div className="other_button_box">
        <ul className="nav_list">
          <Link to={"/"}>
            <li className={`${location === "/" && "active_li"}`}>Home</li>
          </Link>
          <Link to={"/alldebates"}>
            <li className={`${location === "/alldebates" && "active_li"}`}> Debates</li>
          </Link>
          <Link to={"/chatbot"}>
            <li className={`${location === "/chatbot" && "active_li"}`}>chatbot </li>
          </Link>
          {

           data && <Link to={"/subscription"}>
            <li className={`${location === "/subscription" && "active_li"}`}>Subscription </li>
          </Link>
          }
          <Link to={`/profile/${data?._id}`}>
            <li className={`${location === "/profile" && "active_li"}`}>Profile</li>
          </Link>
        </ul>
        {
          data ?
            <SignOutPopover children={
              <>
                <div className="loggedInUserBox">
                  <img referrerPolicy="no-referrer" width={"50px"} src={data?.avatar} alt="UserAvatar" />
                  <div className="loggedInuserDetails">
                    <p>{data.firstName}</p>
                    <p>{data.email}</p>
                  </div>
                </div>
              </>} />

            : <>

              <><Link to={"/login"}>
                <button>Login</button>
              </Link>
                <Link to={"/signup"}>
                  <button className="signup_btn">Signup</button>
                </Link>
              </>





            </>
        }


      </div>
    </div>
  )
}

export default Navbar