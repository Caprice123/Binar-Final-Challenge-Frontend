import React from 'react'

// components
import { Navigate, useLocation } from 'react-router-dom'

// react redux
import { useSelector } from 'react-redux'
import { USER_PROFILE_ROUTE } from '../types/pages'

const PhoneProtectedRoute = ({ children }) => {
    const { currentUser, isLoggedIn } = useSelector(state => state.user)

    const location = useLocation()

    return (
        <>
            {
                isLoggedIn ? (
                    currentUser.user.phone ? (
                        children
                    ) : (
                        <Navigate to={`${USER_PROFILE_ROUTE}?next=${location.search+location.pathname}`} />
                    )
                ) : (
                    children
                )
            }
        </>
    )
}

export default PhoneProtectedRoute