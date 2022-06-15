import React from 'react'
import { Link } from 'react-router-dom'

import { Wrapper, Content, Actions } from './Navbar.styles'

const Navbar = ({ withSearchBar, centeredText, navLinks }) => {
    return (
        <Wrapper className="fixed-top navbar navbar-expand-lg navbar-light">
            <Content className="container-fluid">
                <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                </button>
                <Actions className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav w-100 d-flex justify-content-between">
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
                        <p className="centered-text">
                            {centeredText}
                        </p>
                        <div className="nav-links">
                            { 
                                navLinks?.map((navLink, id) => (
                                    <Link key={id} 
                                            className="nav-link active" 
                                            aria-current="page" 
                                            to={navLink.to}
                                            >
                                                { navLink.text }
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </Actions>
            </Content>
        </Wrapper>
        
    )
}

export default Navbar