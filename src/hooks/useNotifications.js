import { useEffect } from "react"
import { useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from "../services/notifications"
import { statusActions } from '../store/status'

export const useNotifications = (defaultValue) => {
    const [notifications, setNotifications] = useState(defaultValue)
    const { isLoggedIn } = useSelector(state => state.user)
    
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchData = async () => {
            try{
                if (isLoggedIn){
                    dispatch(statusActions.setLoading({
                        status: true,
                    }))
    
                    const response = await dispatch(
                        getNotifications()
                    ).unwrap()
    
                    dispatch(statusActions.setLoading({
                        status: false,
                    }))
    
                    setNotifications(response)
                }
            } catch(err){
                console.log(err)
                dispatch(statusActions.setError({
                    message: err.message,
                }))
            }
        }

        fetchData()
    }, [dispatch, isLoggedIn])

    return notifications 
}