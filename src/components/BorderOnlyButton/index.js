import React from 'react'

import { Wrapper } from './BorderOnlyButton.styles'

const BorderOnlyButton = ({ width, color, text, onClick }) => {
    return (
        <Wrapper type="button" 
                    className="btn btn-outline-primary"
                    width={width}
                    color={color}
                    onClick={onClick}
                    >
            { text }
        </Wrapper>
    )
}

export default BorderOnlyButton