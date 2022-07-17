import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// components
import { Link, useNavigate } from 'react-router-dom'
import { HOME_ROUTE, LOGIN_ROUTE } from '../../types/pages'
import ActionButton from '../ActionButton'

import { validateString } from '../../helpers/validateString'
// styles
import { Wrapper, Content, Actions } from './Navbar.styles'

const Navbar = ({ isOffcanvasOn, withSearchBar, centeredText, navLinks, onClick, searchValue, onChangeSearchText, onSearch, ...styles }) => {
    const offcanvasRef = useRef(null)
    const closeButtonRef = useRef(null)
    const { isLoggedIn } = useSelector(state => state.user)
    const [searchName, setSearchName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!isOffcanvasOn) {
            closeButtonRef.current.click()
        }
    }, [isOffcanvasOn])

    useEffect(() => {
        const checkMobile = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            if (vw >= 992){
                if (closeButtonRef.current){
                    closeButtonRef.current.click()
                }
            }
        }
        window.addEventListener("resize", checkMobile)
        checkMobile()
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const onOpen = () => {
        if (onClick){
            onClick(true)
        }
    }

    const onClose = () => {
        if (onClick){
            onClick(false)
        }
    }

    const onChange = (e) => {
        const { value } = e.currentTarget
        validateString(value, setSearchName)
    }

    const onClickSearchButton = () => {
        console.log(searchName)
        onSearch(searchName)
    }

    return (
        <Wrapper className="fixed-top navbar navbar-expand-lg navbar-light">
            <Content className="position-relative mx-auto" {...styles}>
                <button className="navbar-toggler"
                        data-bs-toggle="offcanvas" 
                        href="#offcanvasWithBothOptions"
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
                                    to={HOME_ROUTE}>        
                            </Link>
                            {
                                withSearchBar && (
                                    <>
                                        <input type="search"
                                                className='form-control'
                                                placeholder='Cari di sini...'
                                                aria-label="Search"
                                                value={searchName}
                                                onChange={onChange}
                                                />
                                        <button className="btn btn-outline-success search-btn" 
                                                type="submit"
                                                onClick={onClickSearchButton}>
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                        <div className="nav-links d-flex align-items-center">
                            {
                                !isLoggedIn ? (
                                    <ActionButton color="var(--primary-purple-04)"
                                                    icon={<i className="fa-solid fa-arrow-right-to-bracket me-3" style={{ color: "var(--white-color)" }}></i>}
                                                    text="Masuk"
                                                    onClick={() => navigate(LOGIN_ROUTE)}
                                                    />
                                ) : (
                                    <>
                                    { 
                                        navLinks?.map((navLink, id) => (
                                            navLink.type === "others" ? (
                                                <div key={id} className='nav-link d-flex align-items-center active'>
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
                                                                
                                                                    <ActionButton color="var(--primary-purple-04)"
                                                                                    icon={navLink.additionalIcon}
                                                                                    text={navLink.text}
                                                                                    />
                                                                )
                                                            }
                                                </Link>
                                            )
                                            
                                        ))
                                    }
                                    </>
                                )
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
                                <div key={id}>
                                    { navLink.mobileComponent }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Content>
        </Wrapper>
        
    )
}

export default Navbar