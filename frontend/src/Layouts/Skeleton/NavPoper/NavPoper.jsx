import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'

import "../../Navbar/Navbar.css"

import * as React from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { TbAward } from 'react-icons/tb';
import { BiBot, BiLogIn, BiLogOut } from 'react-icons/bi';
import { MdOutlinePaid } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

const NavPoper = ({children}) => {
      const { data } = useSelector((state) => state.user)
  return (
    <div style={{position:"relative",zIndex:11}}>

<Menu>
  <MenuButton as={Button}>
    {children}
</MenuButton>
  <MenuList  
  padding={0}
  className='nav_menuList'                                                         >
    <MenuItem  className='nav_menuItem' > 
       <Link to={"/"}>
      
      <AiOutlineHome/>    <p>Home</p>
          </Link>
    </MenuItem>
    <MenuItem  className='nav_menuItem'>
           <Link to={"/alldebates"}>
          
          <TbAward/>  <p>Debates</p>
          </Link>
    </MenuItem>
    <MenuItem  className='nav_menuItem'>
    <Link to="/subscription">
    <MdOutlinePaid/> <p>Subscription</p>
    </Link>

    </MenuItem>

    <MenuItem  className='nav_menuItem'>
    <Link to="/chatbot">
    
    <BiBot/> <p>Chatbot</p>
    </Link>
    </MenuItem>

   {

data &&       <MenuItem  className='nav_menuItem'>
    <Link to={`/profile/${data?._id}`}>
    <CgProfile/> <p>profile</p>
    </Link>

    </MenuItem>
    }
{ !data &&  <>

  
    <Link to={"/login"}>
<button className='nav_dropdown_login_button'> <BiLogIn/> Login</button>
    </Link>

       
    <Link to={'/signup'}>
    
    <button className='nav_dropdown_signup_button'>  <BiLogOut/> Sign up</button>
    </Link>
   
</>
    }
  </MenuList>
</Menu>
    </div>
  )
}

export default NavPoper