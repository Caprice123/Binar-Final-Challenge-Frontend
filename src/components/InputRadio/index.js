import React, { useEffect, useRef } from 'react'

import { Wrapper } from './InputRadio.styles'

const InputRadio = ({ value, labelText, additionalLabelText, id, onChange, defaultValue }) => {
    const inputRef = useRef(null)

    useEffect(() => {
        if (defaultValue){
            inputRef.current.click()
        }
    }, [defaultValue])

    return (
        <Wrapper className="form-check">
            <input ref={inputRef} className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${id}`} value={value} onChange={onChange} />
            <label className="form-check-label" htmlFor={`flexRadioDefault${id}`}>
                { labelText }
            </label>
            {
                additionalLabelText && (
                    <label className="form-check-label label-text" htmlFor={`flexRadioDefault${id}`}>
                        Kamu telah sepakat menjual produk ini kepada pembeli
                    </label>
                )
            }
        </Wrapper>
    )
}

export default InputRadio