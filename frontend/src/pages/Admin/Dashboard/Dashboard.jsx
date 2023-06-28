import DashBoardItemEarnings from "../DashboardItem/DashBoardItemEarnings"
import DashboardBalance from "../DashboardItem/DashboardBalance"
import DashboardItem from "../DashboardItem/DashboardItem"
import DashboardItemDebate from "../DashboardItem/DashboardItemOrder"
import UserChart from "../../../components/Admin/ChartLayout/UserChart"
import styles from "./dashboard.module.css"

const Dashboard = () => {
  return (
    <div  className={styles.dashboard}>


        <div className={styles.upper_item_box}>

            <DashboardItem/>
            <DashboardItemDebate/>
            <DashBoardItemEarnings/>
            <DashboardBalance/>
        </div>
        <UserChart/>


    </div>
  )
}

export default Dashboard