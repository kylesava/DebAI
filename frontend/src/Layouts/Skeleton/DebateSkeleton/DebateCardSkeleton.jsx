import { SkeletonCircle, SkeletonText, Box, Stack } from '@chakra-ui/react'

const DebateCardSkeleton = () => {
    return (
        <Box padding='6' boxShadow='lg' bg='white' flex={1} minWidth={"350px"}>
            <Stack direction={"row"} gap={"4px"}>
                <SkeletonCircle size='50' />
                <SkeletonCircle size='50' />
                <SkeletonCircle size='50' />
            </Stack>
            <SkeletonText mt='4' noOfLines={4} spacing='5' skeletonHeight='5' />
        </Box>
    )
}

export default DebateCardSkeleton