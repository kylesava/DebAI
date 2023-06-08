import React, { useEffect, useState } from "react";
import styles from "./liveDebates.module.css";
import { getCurrentDebateApi } from "../../utils/Api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
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
      <div className={styles.liveDebateList}>
        { liveDebates.length > 0 ? liveDebates.map((debate) => (
          <div key={debate?._id} className={styles.liveDebateItem}>
            <div>
              <h5> 💥 {debate?.topic}</h5>
              <p className={styles.started_time_ago}>
                {format(debate?.startTime)}
              </p>
            </div>
            <Link
              className={styles.joinBtnLink}
              to={`/debate/${debate?.passcode}?audience=true`}
            >
              <button className={styles.join_button}>
                <p>Join</p>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-link-web-flaticons-lineal-color-flat-icons-8.png"
                  alt="external-link-web-flaticons-lineal-color-flat-icons-8"
                />
              </button>
            </Link>
          </div>
        )) : <>

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
