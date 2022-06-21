import React from 'react'

import { Wrapper } from './Alert.styles'

const Alert = ({ active, backgroundColor, color, text, onClick }) => {
    return (
        <Wrapper className={`${active && 'show'} py-3 px-5 d-flex justify-content-between align-items-center`} 
                backgroundColor={backgroundColor} 
                color={color}
                >
            <p>{ text }</p>
            <i className='fa-solid fa-xmark' onClick={onClick}></i>
        </Wrapper>
    )
}

export default Alert