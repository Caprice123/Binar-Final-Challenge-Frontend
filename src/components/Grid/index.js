import React from 'react'

// styles
import { Wrapper } from './Grid.styles'

const Grid = ({ maxSize, children, ...additionalProps }) => {
    return (
        <Wrapper className='grid' maxSize={maxSize} {...additionalProps}>
            { children }
        </Wrapper>
    )
}

export default Grid