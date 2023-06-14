import Coaches from "../../components/Coaches/Coaches"
import LiveDebates from "../../components/LiveDebates/LiveDebates"
import TopDebators from "../../components/TopDebators/TopDebators"
import Banner from "../../Layouts/banner/Banner"
import Navbar from "../../Layouts/Navbar/Navbar"
import "./Home.css"

const Home = () => {
return (
<>
    <Navbar />
  <div className="home_wrapper">
    <Banner />
    <div className="home_bottom_info">
    <LiveDebates/>
    <TopDebators/>
    </div>
  <Coaches/>

  </div>
</>  
)
}

export default Home