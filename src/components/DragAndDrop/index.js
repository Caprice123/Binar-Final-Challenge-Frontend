import React from 'react'

// hooks
import { useDropzone } from 'react-dropzone'

// styles
import { Wrapper } from './DragAndDrop.styles'

const DragAndDrop = ({ onDrop }) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <Wrapper className="d-flex justify-content-center align-items-center position-relative" id="Drag-and-Drop" {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>+</p>
                        
                )
            }
        </Wrapper>
    )
}

export default DragAndDrop