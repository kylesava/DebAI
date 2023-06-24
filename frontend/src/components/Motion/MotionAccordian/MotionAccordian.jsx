import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import {useSelector} from "react-redux"
import styles from "./MotionAccordian.module.css"
import MotionComment from '../MotionComment/MotionComment'
import { addCommentOnMotionApi } from '../../../utils/Api'
import { useRef } from 'react';
import useAlert from '../../../hook/useAlert';

const MotionAccordian = ({motion,setMotion}) => {

      const commentRef =useRef();
      const {data:user} =  useSelector(state=>state.user)
      const {open} =useAlert()



  const handleComment=async()=>{
    if(!commentRef.current.value || !user._id)return;
    try {
        const  {data,status} = await  addCommentOnMotionApi(motion._id,{
            comment:commentRef.current.value,
            userId:user._id
        })
        setMotion(prev=>{
         return prev.map(each=>{
          if(each._id !==motion._id){
            return each
          }else{
          return  data.message
          }
         })
        })
        open({text:"you commented successfully",type:"success"})
        // setMotion(prev=>(

        // ))
        commentRef.current.value = ""

    } catch (error) {
      
    }
  }
  const handleChangeInput=(e)=>{
    // console.log(e.key)
    if(e.key==="Enter"){
      handleComment();
    }

  }

  return (
  <AccordionItem className={styles.accordian_item} py={0} mb={"10px"}  borderRadius={"5px"} border={"none"} >
      <AccordionButton display={"flex"} justifyContent={"space-between"} height={"100%"}> 
        <div className={styles.topic_box}>
          <p className={styles.motion_topic}>{motion.topic}</p>
          <p className={styles.comment_count_text}>   {motion.comments.length > 0  ? `${motion.comments.length} comments `:"No comments"}   </p>
        </div>
         

        <AccordionIcon />
      </AccordionButton>
    <AccordionPanel pb={4}>
        <div className={styles.comment_container}>

     {
         motion.comments.map(comment=><MotionComment key={comment._id} comment={comment}/>)
        }
        </div>
        <div className={styles.new_comment_box}>
          <input onKeyDown={handleChangeInput}  ref={commentRef} type="text" name="" id="" placeholder='comment...' />
        </div>
    </AccordionPanel>
  </AccordionItem>


    )
}

export default MotionAccordian