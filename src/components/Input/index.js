import React, { useState, useRef, useEffect } from 'react'

// styles
import { Wrapper } from './Input.styles'

const Input = ({ type, text, placeholder, value, onChange, required, ...additionalStyles }) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (type === "password"){
            if (showPassword){
                inputRef.current.type = "text"
            } else{
                inputRef.current.type = "password"
            }
        }

    }, [showPassword, type])

    const onClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <Wrapper className='d-flex py-2 position-relative flex-column'>
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
                    ref={inputRef}
                    id={text?.replace(" ", "-")} 
                    placeholder={placeholder} 
                    value={value} 
                    autoComplete="off"
                    onChange={onChange} 
                    {...additionalStyles}
                    />
            
            {
                type === "password" && (
                    <>
                        { 
                            showPassword ? (
                                <i className="fa-solid fa-eye-slash" onClick={onClickShowPassword}></i>
                            ) : (
                                <i className="fa-solid fa-eye" onClick={onClickShowPassword}></i>
                            )
                        }
                    </>
                    
                )
            }
        </Wrapper>
    )
}

export default Input
