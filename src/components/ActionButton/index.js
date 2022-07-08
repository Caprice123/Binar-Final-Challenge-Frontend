import React from 'react'

// styles
import { Wrapper } from './ActionButton.styles'

const ActionButton = ({ width, color, icon, text, onClick, ...additionalProps }) => {
    return (
        <Wrapper type="button" 
                className="btn d-flex align-items-center justify-content-center btn-primary"
                width={width}
                color={color} 
                onClick={onClick}
                {...additionalProps}
                >
                
                {
                    icon && (
                        <span>
                            {icon}
                        </span>
                    )
                }
                { text }

        </Wrapper>
    )
}

export default ActionButton