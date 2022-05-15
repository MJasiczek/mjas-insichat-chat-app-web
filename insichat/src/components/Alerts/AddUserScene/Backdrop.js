import React from 'react'
import backdrop from './Backdrop.module.css'
export const Backdrop3 = (props) => {
    return (
        <div className={backdrop.backdrop} onClick={props.closeBackdrop}>
            
        </div>
    )
}
