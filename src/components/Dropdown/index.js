import React, { useRef, useEffect } from 'react'

// styles
import { Wrapper } from "./Dropdown.styles"

const Dropdown = ({ text, placeholder, value, options, onSelect, required, elasticSearch, onInput }) => {
    const dropdownOptions = useRef(null)
    const dropdown = useRef(null)

    const onClick = () => {
        dropdownOptions.current.classList.add("show")
    }

    const onChange = (e) => {
        onInput(e)
    }

    const onSelected = (e) => {
        dropdownOptions.current.classList.remove("show")
        onSelect(e)
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

    useEffect(() => {
        if (options.length === 0){
            dropdownOptions.current.style.setProperty("height", "0px", "important")
            dropdownOptions.current.style.overflow = "hidden"
        } else if (options.length === 1){
            dropdownOptions.current.style.setProperty("height", "50px", "important")
            dropdownOptions.current.style.overflow = "hidden"
        } else {
            dropdownOptions.current.style.setProperty("height", "100px", "important")
            dropdownOptions.current.style.overflow = "auto"
        }
    }, [options.length])

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
            {
                elasticSearch ? (
                    <input type="text" 
                            placeholder={placeholder} 
                            id={text.replace(" ", "_")}
                            value={value}
                            onClick={onClick}
                            onChange={onChange}
                            autoComplete="off" 
                            onFocus={onClick}
                            />
                            ): (
                    <input type="text" 
                            placeholder={placeholder} 
                            value={value}
                            id={text.replace(" ", "_")}
                            onClick={onClick} 
                            onFocus={onClick}
                            readOnly
                            />
                )
            }
                    
            <i className="fa-solid fa-chevron-down" 
                onClick={onClick}
                >    
            </i>

            <div ref={dropdownOptions} className="options"> 
                            
                { 
                    options.map(({ name }, id) => (
                        <p key={id} 
                            className="d-flex flex-column justify-content-center"
                            onClick={onSelected} 
                            data-value={name}
                            id={name}
                            >
                                { name }
                        </p>
                    ))
                }
            </div>
        </Wrapper>
    )   
}

export default Dropdown