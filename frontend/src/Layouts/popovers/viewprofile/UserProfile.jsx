import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Portal,
} from '@chakra-ui/react'
import { Link } from "react-router-dom"

const UserProfile = ({ children, userId }) => {
    return (
        <Popover placement={"right-end"} >
            <PopoverTrigger>

                <span style={{flex:1}}>{children}</span>

            </PopoverTrigger>
            <Portal > 
                <PopoverContent  >
                    <PopoverArrow />
                    {/* <PopoverHeader>Santosh kuwnwar</PopoverHeader> */}
                    <PopoverCloseButton />
                    <PopoverBody >
                        <Link to={`/profile/${userId}`}>
                            <Button className='profile_popover_button' width={"full"} colorScheme='blue'>View Profile</Button>
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default UserProfile