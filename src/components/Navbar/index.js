import React from 'react'

// components
import { Link } from 'react-router-dom'

// styles
import { Wrapper, Content, Actions } from './Navbar.styles'

const Navbar = ({ withSearchBar, centeredText, navLinks }) => {
    return (
        <Wrapper className="fixed-top navbar navbar-expand-lg navbar-light">
            <Content className="container-fluid position-relative mx-auto">
                <button className="navbar-toggler"
                        data-bs-toggle="offcanvas" 
                        href="#offcanvasExample"
                        role="button" 
                        aria-controls="offcanvasExample"
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                </button>
                <p className="centered-text">
                    {centeredText}
                </p>
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

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Secondhand</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
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
            </Content>
        </Wrapper>
        
    )
}

export default Navbar