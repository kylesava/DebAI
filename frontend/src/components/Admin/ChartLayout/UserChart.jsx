import React, { useState  ,useEffect} from 'react'
import ChartLayout from './ChartLayout'
import { getUserChartDataApi } from '../../../utils/Api'
import styles from "./chart.module.css"

const UserChart = () => {
    const [userChartData,setUserChartData] =useState([])
     useEffect(() => {

        fetchUserChartData()

    }, [])

    const fetchUserChartData=async()=>{

        try {
                const {data,status} = await getUserChartDataApi(2023);
                if(status===200){
                    setUserChartData(data.message)
                }else{
                    throw data.message
                }
        } catch (error) {
            console.log(error.message)
            
        }

    }
    console.log(userChartData)
  return (
    <>
    <div style={{width:"100%",height:"40vh"}} className={styles.user_chart}>
<div className={styles.chart_header}>
<div className={styles.header_left}>

  <img width="100" height="100" src="https://img.icons8.com/plasticine/100/combo-chart.png" alt="combo-chart"/>  <h1 className={styles.chart_header_text}> NEW USERS CHARTS</h1>
</div>
<select name="" id="">
    <option value="2023">2023</option>
</select>
</div>
        <div style={{width:"100%",height:"100%"}}>

        <ChartLayout data={userChartData}/>
        </div>
    </div>
    </>
  )
}

export default UserChart