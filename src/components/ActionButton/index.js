import React from 'react'

// styles
import { Wrapper } from './ActionButton.styles'

const ActionButton = ({ width, color, textColor, icon, text, onClick, ...additionalProps }) => {
    return (
        <Wrapper type="button" 
                className="btn d-flex align-items-center justify-content-center btn-primary"
                width={width}
                color={color} 
                textColor={textColor}
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