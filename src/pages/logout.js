import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../store/user'
import { LOGIN_ROUTE } from '../types/pages'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(userActions.logout())
        navigate(LOGIN_ROUTE, {
            state: {
                message: "Logout successfully",
            }
        })
    }, [dispatch, navigate])
    return (
        <>
        </>
    )
}

export default Logout