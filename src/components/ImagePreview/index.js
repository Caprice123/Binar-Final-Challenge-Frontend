import React from 'react'

import NoImage from '../../assets/images/no-image-found.jpg'
import { Wrapper } from './ImagePreview.styles'

const ImagePreview = ({ url, imageIndex, onDelete }) => {
    return (
        <Wrapper className="position-relative">
            <img src={url ? url : NoImage}
                    alt="preview" 
                    />

            {
                onDelete && (
                    <i data-imageindex={imageIndex} 
                        className="fa-solid fa-xmark" 
                        onClick={onDelete}>

                    </i>
                )
            }
        </Wrapper>
    )
}

export default ImagePreview