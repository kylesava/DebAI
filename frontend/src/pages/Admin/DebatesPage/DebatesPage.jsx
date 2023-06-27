import { useState } from "react"
import styles from "./debatepage.module.css"
import DebateTable from "../../../components/Admin/DebateTableItem/DebateTable"
const DebatesPage = () => {


  const [debateType,setDebateType]=useState("live")

  

  return (
    <div className={styles.debate_page}>

        <div className={styles.debate_page_header}>

            <h1>ALL DEBATES OF DEBAI</h1>


        </div>
        <div className={styles.debate_page_tab}>
            <button className={`${debateType==="live" ?styles.active_debate_tab:""}` } onClick={()=>setDebateType("live")} >LIVE DEBATES </button>
            <button  className={`${debateType==="past" ?styles.active_debate_tab:""}` } onClick={()=>setDebateType("past")} >PAST DEBATES </button>
            <button  className={`${debateType==="upcoming" ?styles.active_debate_tab:""} ` } onClick={()=>setDebateType("upcoming")} >UPCOMING DEBATES</button>
 
        </div>
        <div>
          <DebateTable debateType={debateType}/>



        </div>

    </div>
  )
}

export default DebatesPage