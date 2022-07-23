import { configureStore } from '@reduxjs/toolkit'
import { getCurrentUser } from '../services/user'

import statusSlice from './status'
import userSlice from './user'


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        status: statusSlice.reducer,
    }
})

const updateUser = async () => {
    try{
        const userStateCached = localStorage.getItem("userState")
        if (userStateCached){
            if (JSON.parse(userStateCached).isLoggedIn){
                await store.dispatch(getCurrentUser())
            }
        }
    } catch(err){
        console.log(err)
        window.location.href = "/login"
    }
}
updateUser()

export default store