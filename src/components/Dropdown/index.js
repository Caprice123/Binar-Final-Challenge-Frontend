import React, { useRef, useEffect } from 'react'

// styles
import { Wrapper, Options } from "./Dropdown.styles"

const Dropdown = ({ text, placeholder, value, options, onSelect, required }) => {
    const dropdownOptions = useRef(null)
    const dropdown = useRef(null)

    const onClick = () => {
        if (dropdownOptions.current.classList.contains("show")){
            dropdownOptions.current.classList.remove("show")
        } else {
            dropdownOptions.current.classList.add("show")
        }
    }

    const onSelected = (e) => {
        onSelect(e)
        dropdownOptions.current.classList.remove("show")
    }

    useEffect(() => {
        window.addEventListener("click", e => {
            if (dropdown.current){
                if (!dropdown.current.contains(e.target)){
                    dropdownOptions.current.classList.remove("show")
                }
            }
        })
    }, [])

    return (
        <Wrapper ref={dropdown} 
                    className="d-flex flex-column py-2 position-relative"
                    >
            <label htmlFor={text.replace(" ", "-")}
                    className="my-2"
                    onClick={onClick}
                    >
                        { text }
                        {
                            required && (
                                <span>*</span>
                            )
                        }
            </label>
            <input type="text" 
                    placeholder={placeholder} 
                    value={value}
                    onClick={onClick} 
                    readOnly
                    />
            <i className="fa-solid fa-chevron-down" 
                onClick={onClick}
                >    
            </i>

            <Options ref={dropdownOptions}>
                { 
                    options.map(({ id, name }) => (
                        <p key={id} 
                            className="d-flex flex-column justify-content-center"
                            onClick={onSelected} 
                            data-value={name}
                            >
                                { name }
                        </p>
                    ))
                }
            </Options>
        </Wrapper>
    )   
}

export default Dropdown