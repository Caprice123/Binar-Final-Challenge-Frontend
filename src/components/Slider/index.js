import React from 'react'
import { Wrapper, Content } from './Slider.styles'

const Slider = ({ topic, active, slideFrom, children }) => {
    return (
        <Wrapper className={`${active ? "show" : ""} ${topic}-slider`} slideFrom={slideFrom} id={`${topic}-slider`}>
            <Content>
                { children }
            </Content>
        </Wrapper>
    )
}

export default Slider