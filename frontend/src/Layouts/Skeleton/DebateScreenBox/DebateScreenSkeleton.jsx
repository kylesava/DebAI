import { SkeletonCircle, SkeletonText, Box, Stack ,Skeleton } from '@chakra-ui/react'

const DebateScreenSkeleton = () => {
  return (
    <Box display="flex" gap={"2rem"} width="full">

    <Box padding='6' boxShadow='lg' bg='white' flex={1} minWidth={"100px"}>
   
    <Skeleton startColor='gray.100' endColor='gray.200' height='200px' />
</Box>
    <Box padding='6' boxShadow='lg' bg='white' flex={1} minWidth={"100px"}>

    <Skeleton startColor='gray.100' endColor='gray.200' height='200px' />
</Box>
    </Box>
  )
}

export default DebateScreenSkeleton