import React from 'react'

// styles
import { Wrapper } from './BorderOnlyButton.styles'

const BorderOnlyButton = ({ width, color, text, onClick, ...additionalProps }) => {
    return (
        <Wrapper type="button" 
                    className="border-only-button btn btn-outline-primary"
                    width={width}
                    color={color}
                    onClick={onClick}
                    {...additionalProps}
                    >
                    { text }
        </Wrapper>
    )
}

export default BorderOnlyButton