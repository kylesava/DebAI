import { useToast } from "@chakra-ui/react"

const useAlert=()=>{

 const toast = useToast()



 const open=({type,text})=>{
   console.log("inside toast")
    toast({
       title: '',
        description:text,
        status: type,
        duration: 5000,
        position: "top",
        isClosable: true,
    })
 }
    
return {open}

}
export default useAlert