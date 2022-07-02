import React from 'react'
import { Wrapper, Content, Dot } from './LoadingSpinner.styles'

const LoadingSpinner = ({ active }) => {
    return (
        <Wrapper className={active ? "d-initial" : "d-none"}>
            <Content className='d-flex justify-content-center align-items-center'>
                <Dot />
                <Dot />
                <Dot />
                <p>Loading ...</p>
            </Content>
        </Wrapper>
    )
}

export default LoadingSpinner