import React from 'react'
import { Wrapper } from './ImagePreview.styles'

const ImagePreview = ({ url, imageIndex, onDelete }) => {
    return (
        <Wrapper className="position-relative">
            <img src={url}
                    alt="product image" 
                    />
            <i data-imageindex={imageIndex} 
                className="fa-solid fa-xmark" 
                onClick={onDelete}>

            </i>
        </Wrapper>
    )
}

export default ImagePreview