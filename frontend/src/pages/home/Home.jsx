import TopDebators from "../../components/TopDebators/TopDebators"
import Banner from "../../Layouts/banner/Banner"
import Navbar from "../../Layouts/Navbar/Navbar"
import "./Home.css"

const Home = () => {
  return (
    <div className="home_wrapper">
      <Navbar />
      <Banner />
      <TopDebators/>
    </div>
  )
}

export default Home