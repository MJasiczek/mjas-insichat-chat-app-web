import React from 'react'
import Chat from '../components/Chat/Chat'
import Sidebar from '../components/Sidebar/Sidebar'

export const Main = () => {
    return (
        <div className="main">
        <Sidebar />
        <Chat/>
        </div>
    )
}
