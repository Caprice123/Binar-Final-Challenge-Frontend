import React from 'react'

// styles
import { Wrapper } from './ActiveButton.styles'

const ActiveButton = ({ width, color, text, onClick, ...additionalProps }) => {
    return (
        <Wrapper type="button" 
                className="btn btn-primary"
                width={width}
                color={color} 
                onClick={onClick}
                {...additionalProps}
                >
                { text }
        </Wrapper>
    )
}

export default ActiveButton