import React from 'react'
import "./Sidebar.css"
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <button className='chat_ai_new_chat_btn'>+ New Chat </button>
            <ul className='chat_history'>

                <li className='history_text'>
                    How are You ?
                </li>


            </ul>
            <nav className='chat_bot_side_bottom_main_text'>
                <p>Made By Debatosour </p>
            </nav>
        </div>
    )
}

export default Sidebar