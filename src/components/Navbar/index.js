import React, { useEffect, useRef } from 'react'

// components
import { Link } from 'react-router-dom'
import ActionButton from '../ActionButton'

// styles
import { Offcanvas } from 'bootstrap'
import { Wrapper, Content, Actions } from './Navbar.styles'

const Navbar = ({ isOffcanvasOn, withSearchBar, centeredText, navLinks, onClick, ...styles }) => {
    const offcanvasRef = useRef(null)
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!isOffcanvasOn) {
            closeButtonRef.current.click()
        }
    }, [isOffcanvasOn])

    const onOpen = () => {
        onClick(true)
    }

    const onClose = () => {
        onClick(false)
    }

    return (
        <Wrapper className="fixed-top navbar navbar-expand-lg navbar-light">
            <Content className="position-relative mx-auto">
                <button className="navbar-toggler"
                        data-bs-toggle="offcanvas" 
                        href="#offcanvasWithBothOptions"
                        role="button" 
                        aria-controls="offcanvasWithBothOptions"
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                        onClick={onOpen}
                        >
                        <span className="navbar-toggler-icon"></span>
                </button>
                <p className="centered-text">
                    {centeredText}
                </p>
                <Actions className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav w-100 d-flex justify-content-between align-items-center">
                        <div className="d-flex navbar-nav">
                            <Link className="navbar-brand" 
                                    to='/'>        
                            </Link>
                            {
                                withSearchBar && (
                                    <>
                                        <input className="form-control" 
                                                type="search" 
                                                placeholder="Search" 
                                                aria-label="Search" 
                                                />
                                        <button className="btn btn-outline-success" 
                                                type="submit">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                        <div className="nav-links d-flex align-items-center">
                            { 
                                navLinks?.map((navLink, id) => (
                                    navLink.type === "others" ? (
                                        <div className='nav-link d-flex align-items-center active'>
                                            <span>
                                                { navLink.additionalIcon }
                                            </span>
                                            { navLink.text }
                                        </div>
                                    ) : (

                                        <Link key={id} 
                                                className="nav-link d-flex align-items-center active" 
                                                aria-current="page" 
                                                to={navLink.to}
                                                {...styles}
                                                >
                                                    {
                                                        navLink.type === "text" && (
                                                            <>
                                                                <span>
                                                                    { navLink.additionalIcon }
                                                                </span>
                                                                { navLink.text }
                                                            </>
                                                        )
                                                    }
    
                                                    {
                                                        navLink.type === "button" && (
                                                        
                                                            <ActionButton width="100%"
                                                                            color="#7126B5"
                                                                            icon={navLink.additionalIcon}
                                                                            text={navLink.text}
                                                                            {...styles}
                                                                            />
                                                        )
                                                    }
                                        </Link>
                                    )
                                    
                                ))
                            }
                        </div>
                    </div>
                </Actions>

                <div ref={offcanvasRef} className="offcanvas offcanvas-start" tabIndex="-1" data-bs-scroll="true" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Secondhand</h5>
                        <button ref={closeButtonRef} onClick={onClose} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        { 
                            navLinks?.map((navLink, id) => (
                                <Link key={id} 
                                        className="nav-link d-flex align-items-center active" 
                                        aria-current="page" 
                                        to={navLink.to}
                                        {...styles}
                                        >
                                            {
                                                navLink.type === "button" ? (
                                                    <ActionButton width="100%"
                                                                    color="#7126B5"
                                                                    icon={navLink.additionalIcon}
                                                                    text={navLink.text}
                                                                    {...styles}
                                                                    />
                                                ) : (
                                                    navLink.mobileComponent 
                                                )
                                            }
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </Content>
        </Wrapper>
        
    )
}

export default Navbar