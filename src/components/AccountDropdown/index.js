import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper, Content } from './AccountDropdown.styles'
import { LOGOUT_ROUTE, USER_PROFILE_ROUTE } from '../../types/pages'

const AccountDropdown = () => {
    const containerRef = useRef(null)
    const dropdownRef = useRef(null)

    const onClick = () => {
        dropdownRef.current.classList.toggle('show')
    }

    useEffect(() => {
        const onResize = (e) => {
            if (containerRef.current){
                if (!containerRef.current.contains(e.target)){
                    dropdownRef.current.classList.remove("show")
                }
            }
        }

        window.addEventListener("click", onResize)

        return () => window.removeEventListener("resize", onResize)
    }, [])


    return (
        <Wrapper ref={containerRef} className='position-relative'>
            <button className="position-relative" onClick={onClick}>
                <i className="fa-solid fa-user"></i>
            </button>
            <Content ref={dropdownRef} className="pb-3">
                <Link to={USER_PROFILE_ROUTE} className='pt-3 pb-1 pe-3'>
                    Ubah Akun
                </Link>
                <hr />
                <Link to={USER_PROFILE_ROUTE} className='pt-3 pb-1 pe-3'>
                    Pengaturan Akun
                </Link>
                <hr />
                <Link to={LOGOUT_ROUTE} className='pt-3 pb-1 pe-3'>
                    Logout Akun
                </Link>
                <hr />
            </Content>
        </Wrapper>
    )
}

export default AccountDropdown