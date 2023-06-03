import { DebateMotion } from "../../../utils/data"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import styles from "./debateMotionTabs.module.css"
import { useState } from "react";

const DebateMotionTabs = ({handleChangeTopic,userTopic}) => {


  return (
    <Box width={"700px"} >

<Tabs isFitted variant='enclosed' >
  <TabList mb='10px'>

    {
        Object.entries(DebateMotion).map(([key,value])=>(
            <Tab textTransform={"uppercase"} fontSize={"14px"} letterSpacing={"1px"}>{key}</Tab>
            ))
        }

  </TabList>
  <TabPanels>
    {
        Object.entries(DebateMotion).map(([key,value])=>(
                <TabPanel p={0}>
                    <ol type="1" className={styles.debate_topic_list}>

                    {
                        value.map((topic,index )=>(
                            <li  className={`${topic=== userTopic && styles.active_topic}`} onClick={()=>handleChangeTopic(topic)} key={index}>
                              {topic}

                                </li>
                        ))
                    }
                    </ol>
                </TabPanel>
        ))
    }
   <TabPanel>
      <p>one!</p>
    </TabPanel>

  </TabPanels>
</Tabs>
        </Box>
  )
}

export default DebateMotionTabs