import React, { useEffect } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/store'

export const Toast = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const { AddToastRef } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    AddToastRef(toast)
  }, [])


  return (
    // <Button

    //   onClick={() =>
    //     toast({
    //       title: 'Account created.',
    //       description: "We've created your account for you.",
    //       status: 'success',
    //       duration: 5000,
    //       position:"top",
    //       isClosable: true,
    //     })
    //   }
    // >
    // </Button>
    <>
    </>
  )
}