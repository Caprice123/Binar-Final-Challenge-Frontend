import React from 'react'

// styles
import { Wrapper } from './Input.styles'

const Input = ({ type, text, placeholder, value, onChange, styles, required }) => {
    return (
        <Wrapper className='d-flex py-2 flex-column'>
            <label htmlFor={text.replace(" ", "-")}
                    className="my-2">
                        { text }
                        {
                            required && (
                                <span>*</span>
                            )
                        }
            </label>
            <input type={type} 
                    id={text.replace(" ", "-")} 
                    placeholder={placeholder} 
                    value={value} 
                    autoComplete="off"
                    onChange={onChange} 
                    />
        </Wrapper>
    )
}

export default Input
