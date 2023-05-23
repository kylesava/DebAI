import {
    Modal,
    ModalOverlay,
    ModalContent,

    ModalBody,
    ModalCloseButton,

    useDisclosure,
    ModalHeader,
    Button,
  } from '@chakra-ui/react'
  import {RxSpeakerLoud} from "react-icons/rx"
  import styles from "./DebateFinishModal.module.css"
import { AiOutlineCloudDownload } from 'react-icons/ai';

  function DebateTranscriptModal({ children  ,transcript }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleOnClose=async()=>{
        onClose()
    }

    return (
      <>
      <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen}   onClose={onClose}>

          <ModalOverlay />
          <ModalContent  className={styles.finishModalContainer}>
            <ModalCloseButton />
            <ModalHeader display={"flex"} gap={"10px"}>

            <Button className={styles.speakButton}>
              <RxSpeakerLoud/>
              <p>


              Speak it
              </p>
            </Button>
            <Button className={styles.downloadButton}>
              <AiOutlineCloudDownload/>
              <p>

              Download 
              </p>
            </Button>

            </ModalHeader>
            <ModalBody P={"0px"} >   

            <div className={styles.transcript_content} >
    <p>
      {
        transcript.map(text=>(
          <p className={styles.para}>
            {text}
            </p>
        ))
      }
        </p>
            </div>
          
            </ModalBody>
  
       
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default DebateTranscriptModal