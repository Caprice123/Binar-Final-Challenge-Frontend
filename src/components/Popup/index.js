import React, { useEffect, useRef, useCallback } from 'react'

import { Wrapper, Content, Header, Body } from './Popup.styles'

const Popup = ({ topic, show, children, onClick }) => {
    const closeButtonRef = useRef(null)
    const openButtonRef = useRef(null)
    const containerRef = useRef(null)
    const popupRef = useRef(null)
    // console.log(topic, show)
    useEffect(() => {
        if (show){
            openButtonRef.current.click()
        } else{
            closeButtonRef.current.click()
        }
    }, [show])

    const onToggle = useCallback((value) => {
        onClick(value)
    }, [onClick])

    useEffect(() => {
        popupRef.current.addEventListener("shown.bs.modal", () => {
            onToggle(true)
        })
        popupRef.current.addEventListener("hidden.bs.modal", () => {
            onToggle(false)
        })
    }, [onToggle])

    return (
        <>
            <button ref={openButtonRef}
                    className="btn btn-primary d-none" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#exampleModal-${topic}`}
                    >
            </button>
            <div ref={popupRef}
                    className="modal fade" 
                    id={`exampleModal-${topic}`} 
                    tabIndex="-1" 
                    aria-labelledby={`exampleModalLabel-${topic}`} 
                    aria-modal="true"
                    >
                <Wrapper ref={containerRef} className="modal-dialog modal-dialog-centered">
                    <Content className="modal-content">
                        <Header className="modal-header">
                            <button ref={closeButtonRef}
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                    // onClick={onClick}
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