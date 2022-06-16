import React from 'react'

// styles
import { Wrapper } from './Grid.styles'

const Grid = ({ children }) => {
    return (
        <Wrapper>
            { children }
        </Wrapper>
    )
}

export default Grid