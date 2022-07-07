import React from 'react'

// styles
import { Wrapper } from './Grid.styles'

const Grid = ({ maxSize, children, ...additionalProps }) => {
    return (
        <Wrapper maxSize={maxSize} {...additionalProps}>
            { children }
        </Wrapper>
    )
}

export default Grid