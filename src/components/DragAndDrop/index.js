import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Wrapper } from '../DragAndDrop/DragAndDrop.styles'

const DragAndDrop = ({ onDrop }) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <Wrapper className="d-flex justify-content-center align-items-center position-relative" {...getRootProps()}>
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