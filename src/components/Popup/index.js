import React, { useEffect, useRef } from 'react'

import { Wrapper, Content, Header, Body } from './Popup.styles'

const Popup = ({ show, onClick, children }) => {
    const closeButtonRef = useRef(null)
    const openButtonRef = useRef(null)

    useEffect(() => {
        if (show){
            openButtonRef.current.click()
        } else{
            onClick()
            closeButtonRef.current.click()
        }
    }, [show, onClick])

    return (
        <>
            <button ref={openButtonRef}
                    className="btn btn-primary d-none" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    >
                    Launch demo modal
            </button>
            <div className="modal fade" 
                    id="exampleModal" 
                    tabindex="-1" 
                    aria-labelledby="exampleModalLabel" 
                    aria-modal="true"
                    >
                <Wrapper className="modal-dialog modal-dialog-centered">
                    <Content className="modal-content">
                        <Header className="modal-header">
                            <button ref={closeButtonRef}
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                    >        
                            </button>
                        </Header>
                        <Body className="modal-body">
                            { children }
                        </Body>
                    </Content>
                </Wrapper>
            </div>
        </>
    )
}

export default Popup