import React from 'react'

import DebateFormInput from '../../components/DebateForm/DebateFormInput'
import Navbar from "../../Layouts/Navbar/Navbar"
import { AlertLayout } from '../../Layouts/Alert/AlertLayout'
import { useSelector } from 'react-redux'
import "./CreateDebate.css"
const CreateDebate = () => {
  const { data } = useSelector((state) => state.user)
  return (
    <>
      <Navbar />
      <div className='CreateDebateWrapper'>
        {
          !data && <AlertLayout />
        }
        <div className="create_debate_form">
          <DebateFormInput />
        </div>
      </div>
    </>
  )
}
export default CreateDebate

