import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

import { City } from 'country-state-city'

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (payload) => {
        console.log(payload)
        const formData = new FormData()
        
        for (const key in payload){
            formData.append(key, payload[key])
        }

        const response = await api.put(
            "/users", 
            formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        const data = response.data
        return data
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        console.log(payload)
        const response = await api.post(
            '/login', 
            payload
        )
        const data = response.data
        return data
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        console.log(payload)
        const response = await api.post(
            '/register', 
            payload
        )
        const data = response.data
        return data
    }
)

const defaultState = {
    currentUser: {},
    availableCities: [],
    loading: false,
    error: "",
    isLoggedIn: false
}

const userStateCached = JSON.parse(localStorage.getItem("userState"))

const initialState = userStateCached
                    ? userStateCached
                    : defaultState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCities: (state) => {
            const allCities = City.getCitiesOfCountry('ID')
            state.availableCities = allCities
            localStorage.setItem("userState", JSON.stringify(state))
        }
    }, 
    extraReducers: {
        // updateUser
        [updateUser.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [updateUser.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [updateUser.rejected]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },

        // login
        [login.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [login.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            state.isLoggedIn = true
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [login.rejected]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },

        // register
        [register.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [register.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        [register.rejected]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
    }
})



export const userActions = userSlice.actions
export default userSlice
