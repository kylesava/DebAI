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
  import styles from "./DebateFinishModal.module.css"
import { Enums } from '../../../redux/action/actionTypes/Enumss';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

  function AnalyzeResultModal({ children  ,activeDebate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect(()=>{
      onOpen()
    },[])

    return (
      <>
        <Modal isOpen={isOpen}  >

          <ModalOverlay />
          <ModalContent  className={styles.analyzeModalContainer}>
            {/* <ModalCloseButton /> */}
            <ModalHeader display={"flex"} gap={"10px"}>
            </ModalHeader>
            <ModalBody P={"0px"} >   
            <div className={styles.analyszeText} >
              <AiOutlineLoading3Quarters/>
             <p>
               {
                activeDebate?.judgeType===Enums.AIJUDGE ? "AI is generating the result .":"Finishing the debate . Please dont get back !! "
               } 
                Please dont get back !! 
             </p>
            </div>
          
            </ModalBody>
  
       
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default AnalyzeResultModal