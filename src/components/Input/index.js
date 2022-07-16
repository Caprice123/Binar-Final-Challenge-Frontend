import React from 'react'

// styles
import { Wrapper } from './Input.styles'

const Input = ({ type, text, placeholder, value, onChange, required, ...additionalStyles }) => {
    return (
        <Wrapper className='d-flex py-2 flex-column'>
            {
                text && (
                <label htmlFor={text.replace(" ", "-")}
                        className="my-2">
                            { text }
                            {
                                required && (
                                    <span>*</span>
                                )
                            }
                </label>
                )
            }
            <input type={type} 
                    id={text?.replace(" ", "-")} 
                    placeholder={placeholder} 
                    value={value} 
                    autoComplete="off"
                    onChange={onChange} 
                    {...additionalStyles}
                    />
        </Wrapper>
    )
}

export default Input
