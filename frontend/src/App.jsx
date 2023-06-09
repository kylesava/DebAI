import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { bindActionCreators } from "redux";
import Signup from "./pages/Auth/Signup/Signup";
import ChatBot from "./pages/chatbot/ChatBot";
import DebateRoom from "./pages/debateRoom/DebateRoom";
import Home from "./pages/home/Home";
import { actionCreators } from "./redux/store";
import { useEffect } from "react"
import { getLoggedInUserApi } from "./utils/Api";
import Login from "./pages/Auth/Login/Login";
import { Loader } from "./Layouts/Loader/Loader";
import CurrentDebates from "./pages/CurrentDebates/CurrentDebates";
import CreateDebate from "./pages/CreateDebate/CreateDebate";
import 'antd/dist/reset.css';
import "./App.css"
import Profile from "./pages/profile/Profile";
import  Watchnow from "./pages/WatchNow/Watchnow";
import  Subscription from "./pages/Subscription/Subscription";
import DebateCompletionUi from "./components/DebateRoom/DebateCompletionUi/DebateCompletionUi";
import Confirmation from "./pages/confirmation/Confirmation";
import ConfirmationEmailSent from "./pages/Auth/ConfirmationSent/Confirmation_email_sent";
import SentEmailForPassword from "./pages/Auth/SentEmailForPassword/SentEmailForPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import Motions from "./pages/motions/Motions";
import Admin from "./pages/Admin/Home/Admin";
import Index from "./pages/Admin/Index/Index";
import MotionUpload from "./pages/Admin/motionUpload/MotionUpload";
import UsersPage from "./pages/Admin/Users/UsersPage";
import EditUserPage from "./pages/Admin/EditUser/EditUserPage";
import DebatesPage from "./pages/Admin/DebatesPage/DebatesPage";
import EditDebatePage from "./pages/Admin/DebatesPage/EditDebatePage/EditDebatePage";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import DebateTopicUploader from "./components/AdminForm/MotionFileForm/MotionFileForm";

function App() {
  const { data } = useSelector((state) => state.user)
  const { isLoading, refresh } = useSelector((state) => state.other)
  const { roomLoading} = useSelector((state) => state.debate);


  const dispatch = useDispatch()

  const { AddLoggedInUser, setIsLoading } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    fetchCurrentUser()
  }, [refresh])

  const fetchCurrentUser = async () => {
    setIsLoading(true)
    try {
      const res = await getLoggedInUserApi()
      if (res.status === 200) {
        AddLoggedInUser(res.data.message)

        setIsLoading(false)
      } else {
        throw Error("You are not logged In")
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error?.message)
    }

  }



  return (
    <>
      <div className="App">
        {
          ( roomLoading  || isLoading) ? <Loader /> :""
        }
       {
        data?.isAdmin ? <AdminRoutes/> :<VisitorsRoutes data={data}/>
       }
       {/* <AdminRoutes/> */}
      </div>

    </>
  );
}

export default App;





const AdminRoutes=()=>{
  return (




      <>
          <Routes>
        <Route path="" element={<Navigate  to={"/admin"} />}/>
        <Route path="/admin" element={<Index />}>
          <Route path="" element={<Dashboard/>} />
          <Route path="motion" element={<Motions />} />
          <Route path="debates"  element={<DebatesPage/>}/>

          <Route path="user"  element={<UsersPage/>}/>
            {/* if i want to nest the user in the parent route there should be only the component or content which is same for all nested route if not you can leave empty adding only with <Outlet/> to display the nested route elements but adding the <Outlet/> is compulsion */}

            <Route   path="debates/edit/:id" element={<EditDebatePage/>}/>
           <Route path="user/edit/:id" element={<EditUserPage/>}/> 

          {/* <Route  path="motion/"   /> */}
          <Route path="motion/upload" element={<DebateTopicUploader/>} />
        </Route>
      </Routes>
      
      
      
      
      
      </>



)
}


const VisitorsRoutes=(data)=>{
  return(
    
    <Routes>

          <Route path="" element={<Home/>} />
        <Route path="/alldebates" element={<CurrentDebates />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/create" element={<CreateDebate />} />
        <Route path="/profile/:profileId" element={  <Profile />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/debate/:debateId" element={<DebateRoom />} />
        <Route path="/watch/:debateId" element={<Watchnow />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/completion/:debateId"  element={<DebateCompletionUi/>}/>
        <Route path="/motion"  element={<Motions/>} />
        
        <Route path="/account" >
        <Route path="confirmation/:confirmationCode"  element={<Confirmation/>}/>
        <Route path="confirmation_email_sent"  element={<ConfirmationEmailSent/>}/>
        <Route path="passwordresetlink" element={<SentEmailForPassword/>} />  
        <Route path="resetpassword/:resettoken" element={<ResetPassword/>}/>
        <Route path="verifyemail" element={<VerifyEmail/>} />

      </Route>

      </Routes>


  )
}
