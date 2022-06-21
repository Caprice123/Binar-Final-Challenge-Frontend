import React from 'react'

// styles
import { Wrapper } from './Grid.styles'

const Grid = ({ maxSize, children }) => {
    return (
        <Wrapper maxSize={maxSize}>
            { children }
        </Wrapper>
    )
}

export default Grid