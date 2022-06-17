import React, { useRef } from 'react'

// styles
import { Wrapper } from './InputFile.styles'

const InputFile = ({ onChange }) => {
    const inputFileRef = useRef(null)

    const onClick = () => {
        inputFileRef.current.click()
    }
    return (
        <Wrapper className='d-flex position-relative' onClick={onClick}>
            <input ref={inputFileRef}
                    type='file'
                    className='d-none'
                    onChange={onChange}
                    />
            <i className="fa-solid fa-camera"></i>
        </Wrapper>
    )
}

export default InputFile