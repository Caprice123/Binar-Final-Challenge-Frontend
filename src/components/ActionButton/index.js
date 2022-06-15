import React from 'react'

import { Wrapper } from './ActiveButton.styles'

const ActiveButton = ({ width, color, text, onClick }) => {
    return (
        <Wrapper type="button" 
                className="btn btn-primary"
                width={width}
                color={color} 
                onClick={onClick}
                >
                { text }
        </Wrapper>
    )
}

export default ActiveButton