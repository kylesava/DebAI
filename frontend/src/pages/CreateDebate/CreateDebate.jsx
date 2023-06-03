import React, { useState } from 'react'
import DebateFormInput from '../../components/DebateForm/DebateFormInput'
import Navbar from "../../Layouts/Navbar/Navbar"
import { AlertLayout } from '../../Layouts/Alert/AlertLayout'
import { useSelector } from 'react-redux'
import "./CreateDebate.css"
import {  StepperComp } from '../../Layouts/stepper/Stepper'

const CreateDebate = () => {
  const { data } = useSelector((state) => state.user)
    const [stepIndex,setStepIndex] = useState(0);

  return (

    <>
      <Navbar />
      <div className='CreateDebateWrapper'>
        {
          !data && <AlertLayout />
        }
        <StepperComp active={stepIndex}/>
        <div className="create_debate_form">
          <DebateFormInput setStepIndex={setStepIndex} stepIndex={stepIndex}/>
        </div>
      </div>
    </>
  )
}
export default CreateDebate

