import React from 'react'

// components
import { Navigate } from 'react-router-dom'

// react redux
import { useSelector } from 'react-redux'
import { LOGIN_ROUTE } from '../types/pages'

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { currentUser, isLoggedIn } = useSelector(state => state.user)

    return (
        <>
            {
                isLoggedIn && (allowedRoles.length === 0 || allowedRoles.contains(currentUser.role)) ? (
                    children
                ) : (
                    <Navigate to={LOGIN_ROUTE} />
                )
            }
        </>
    )
}

export default ProtectedRoute