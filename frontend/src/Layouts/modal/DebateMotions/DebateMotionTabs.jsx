import { DebateMotion } from "../../../utils/data"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import styles from "./debateMotionTabs.module.css"


const DebateMotionTabs = ({handleChangeTopic,userTopic,setCustomTopic,setActiveTab }) => {


  return (
    <Box width={"700px"} >

<Tabs isFitted variant='enclosed' >
  <TabList mb='10px'>

    {
        Object.entries(DebateMotion).map(([key,value])=>(
            <Tab
            onClick={()=>setActiveTab(key)}
             textTransform={"uppercase"}
             fontSize={"14px"}
             letterSpacing={"1px"}
               >
                {key}
               </Tab>
            ))
        }
              <Tab  onClick={()=>setActiveTab("custom")} textTransform={"uppercase"} fontSize={"14px"} letterSpacing={"1px"}>custom</Tab>
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
    <input type="text" onChange={(e)=>setCustomTopic(e.target.value)} placeholder="Create your custrom topic" className={styles.custom_topic_input}/>
    </TabPanel>

  </TabPanels>
</Tabs>
        </Box>
  )
}

export default DebateMotionTabs