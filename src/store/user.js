import { createSlice } from '@reduxjs/toolkit'

import { City } from 'country-state-city'

import { getCurrentUser, login } from '../services/user'

const defaultState = {
    currentUser: {
        user: {
            address: null,
            city: null,
            email: null,
            id: null,
            name: null,
            phone: null,
        },
        token: null,
    },
    availableCities: [],
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
        },
        clearError: (state) => {
            state.error = ""
            localStorage.setItem("userState", JSON.stringify(state))
        },
        logout: (state) => {
            state.currentUser = defaultState.currentUser
            state.isLoggedIn = false
            localStorage.setItem("userState", JSON.stringify(state))
        }
    }, 
    extraReducers: {
        // getCurrentUser
        [getCurrentUser.fulfilled]: (state, action) => {
            state.currentUser.user = action.payload
            localStorage.setItem("userState", JSON.stringify(state))
        },

        // login
        [login.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.isLoggedIn = true
            localStorage.setItem("userState", JSON.stringify(state))
        }
    }
})



export const userActions = userSlice.actions
export default userSlice
