import {
  Alert,
  Stack,
  AlertIcon,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AlertLayout = () => {

  const navigate = useNavigate()
  const navigateToLogin = () => navigate("/login")




  return (
    <>
      <Stack spacing={3} mb={"2"}>
        <Alert status='error'>
          <AlertIcon />
          <p>

            You need to login before you create  a new debate
          </p>
          <Button onClick={navigateToLogin} color={"white"} fontWeight={"500"} letterSpacing={"1px"} background={"red.400"} marginLeft={"auto"}>
            Login Now
          </Button>
        </Alert>
      </Stack>
      {/* <h1>HELLO EVERY ONE </h1> */}
    </>

  )
}