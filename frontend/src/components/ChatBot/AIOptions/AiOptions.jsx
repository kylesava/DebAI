import React from 'react'
import { AI_OPTIONS } from '../../../utils/data'
import "./Aioption.css"
const AiOptions = () => {


  return (
    <div className='AI_option_wrapper'>
      <h1 className='ai_option_main_text'>DEBATOSOUR AI CHAT  </h1>
      <div className='ai_option_container'>

        {
          AI_OPTIONS.map(item => (
            <>
              <div className='Ai_option_item'>
                <h2 className='ai_option_name'>{item.name}</h2>
                <h2 className='ai_option_desc'>{item.description}</h2>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default AiOptions