import LiveDebates from "../../components/LiveDebates/LiveDebates"
import TopDebators from "../../components/TopDebators/TopDebators"
import Banner from "../../Layouts/banner/Banner"
import Navbar from "../../Layouts/Navbar/Navbar"
import "./Home.css"

const Home = () => {
  return (
    <div className="home_wrapper">
      <Navbar />
      <Banner />
      <div className="home_bottom_info">
    <LiveDebates/>
      <TopDebators/>
      </div>
    </div>
  )
}

export default Home