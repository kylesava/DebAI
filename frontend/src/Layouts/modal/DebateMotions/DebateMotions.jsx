import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  useToast,

} from '@chakra-ui/react';

import styles from "./debateMotion.module.css"
import DebateMotionTabs from './DebateMotionTabs';

 function DebateMotionModal({children ,activeTopic ,handleDebateTopicChange}) {


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userTopic,setUserTopic] = useState(activeTopic);
  const [activeTab,setActiveTab] =useState("mini");
  const [customTopic,setCustomTopic] =useState("")  
  const Toast = useToast()


  const handleChangeTopic = (topic)=>setUserTopic(topic);
  const handleConfirm =()=>{
      if(activeTab==="custom"){

        if(customTopic.length > 15){

          handleDebateTopicChange(customTopic)
          setActiveTab("mini")
          setCustomTopic("")
          onClose()
        }else{
         showToast("error","Topic should be more than 15 characters") 
         return;
        }
        
      }else{
        console.log("inside usertopic",userTopic)
          handleDebateTopicChange(userTopic)
          onClose()

      }

      
  }
  const showToast =(type,text) =>{
    Toast({
          title:"",
          description: text,
          status: type  ,
          duration: 5000,
          position: "top",
          isClosable: true,
      
    })
  }

  return (
    <>

 

      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={()=>{onClose();setActiveTab("mini");setCustomTopic("")}}  >
        <ModalOverlay  />
<ModalContent   className={styles.motion_tab_content} maxWidth={"700px"} maxH={"500px"} >
 
       
          <ModalBody p={0}>
        
                <DebateMotionTabs 
                customTopic={customTopic}
                setCustomTopic={(value)=>setCustomTopic(value)}
                setActiveTab={(value)=>setActiveTab(value)}
                handleChangeTopic={handleChangeTopic} 
                userTopic={userTopic}/>

          </ModalBody>
          <ModalFooter  p={"5px"}>
          <Button  className={styles.close_button} colorScheme='purple' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' className={styles.confirm_button} onClick={handleConfirm}>CONFIRM</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
export default DebateMotionModal;