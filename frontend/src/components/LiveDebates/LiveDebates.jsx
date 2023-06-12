import React, { useEffect, useState } from "react";
import styles from "./liveDebates.module.css";
import { getCurrentDebateApi } from "../../utils/Api";

import { LiveDebateItem } from "./liveDebateItem/LiveDebateItem";
import AutoSlider from "../../Layouts/autoSlide/AutoSlider";
const LiveDebates = () => {
  const [liveDebates, setLiveDebates] = useState([]);

  useEffect(() => {
    getCurrentDebate();
  }, []);
  const getCurrentDebate = async () => {
    try {
      const { data, status } = await getCurrentDebateApi();

      if (status !== 200) return;
      setLiveDebates(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.live_debate_box}>
      <div className={styles.live_debate_heading}>
        <h2 className={styles.live_debate_heading_text}>
          {" "}
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/radio-waves.png"
            alt="radio-waves"
          />{" "}
          LIVE DEBATES
        </h2>
        <p className={styles.live_debate_sub_heading}>
          watch debate which ever you like{" "}
        </p>
      </div>
<div className={styles.live_debate_debates_wrapper}>

        { liveDebates.length > 0 ? 
        
          liveDebates?.map(deb=><LiveDebateItem debate={deb} key={deb._id}/>)
        
        : <>

          <div className={styles.no_live_debates_box}>

        
         <img src="/images/nolivedebate.png"  className={styles.noLiveDebatesImage} />
          <p>No live debates </p>
          </div>
        </>
         }
         </div>
      
    </div>
  );
};

export default LiveDebates;
