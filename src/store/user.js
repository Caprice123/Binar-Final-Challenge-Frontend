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


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        availableCities: [],
        loading: false,
        error: "",
        isLoggedIn: false,
    },
    reducers: {
        getCities: (state) => {
            const allCities = City.getCitiesOfCountry('ID')
            state.availableCities = allCities
        }
    }, 
    extraReducers: {
        // updateUser
        [updateUser.pending]: (state) => {
            state.loading = true
            state.error = ""
        },
        [updateUser.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
        },
        [updateUser.rejected]: (state) => {
            state.loading = false
            state.error = ""
        },

        // login
        [login.pending]: (state) => {
            state.loading = true
            state.error = ""
        },
        [login.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
        },
        [login.rejected]: (state) => {
            state.loading = false
            state.error = ""
        },

        // register
        [register.pending]: (state) => {
            state.loading = true
            state.error = ""
        },
        [register.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
        },
        [register.rejected]: (state) => {
            state.loading = false
            state.error = ""
        },


        
    }
})



export const userActions = userSlice.actions
export default userSlice
