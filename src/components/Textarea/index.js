import React from 'react'

// styles
import { Wrapper } from './Textarea.styles'

const Textarea = ({ text, placeholder, value, onChange, required }) => {
    return (
        <Wrapper className="d-flex py-2 flex-column">
            <label htmlFor={text.replace(" ", "-")}
                    className="my-2">
                        { text }
                        {
                            required && (
                                <span>*</span>
                            )
                        }
            </label>
            <textarea id={text.replace(" ", "-")} 
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        />
        </Wrapper>
    )
}

export default Textarea