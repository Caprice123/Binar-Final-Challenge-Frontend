import React from 'react'

// styles
import { Wrapper } from './ActionButton.styles'

const ActionButton = ({ width, color, text, onClick, ...additionalProps }) => {
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

export default ActionButton