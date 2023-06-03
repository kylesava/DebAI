import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,

} from '@chakra-ui/react';

import styles from "./debateMotion.module.css"
import DebateMotionTabs from './DebateMotionTabs';

 function DebateMotionModal({children ,activeTopic ,handleDebateTopicChange}) {


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userTopic,setUserTopic] = useState(activeTopic);

  const handleChangeTopic = (topic)=>setUserTopic(topic);
  const handleConfirm =()=>{
    handleDebateTopicChange(userTopic)
    onClose()
  }

  return (
    <>

 

      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay  />
<ModalContent   className={styles.motion_tab_content} maxWidth={"700px"} maxH={"500px"} >
 
       
          <ModalBody p={0}>
        
                <DebateMotionTabs  handleChangeTopic={handleChangeTopic} userTopic={userTopic}/>
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