import { createSlice } from '@reduxjs/toolkit'

import { rejectBid, acceptBid, updateStatusBid } from '../services/bids'

const defaultState = {
    loading: false,
    error: ""
}

const bidCached = JSON.parse(localStorage.getItem("bidState"))

const initialState = bidCached 
                    ? bidCached
                    : defaultState

const bidSlice = createSlice({
    name: 'bid',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        }
    }, 
    extraReducers: {
        // reject bid
        [rejectBid.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [rejectBid.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        }, 
        [rejectBid.rejected]: (state, action) => {
            state.loading = false
            // error
            state.error = action.error.message
            localStorage.setItem("bidState", JSON.stringify(state))
        },

        // acceptBid
        [acceptBid.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [acceptBid.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        }, 
        [acceptBid.rejected]: (state, action) => {
            console.log(action.error.message)
            state.loading = false
            state.error = action.error.message
            localStorage.setItem("bidState", JSON.stringify(state))
        },

        // updateStatusBid
        [updateStatusBid.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [updateStatusBid.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        }, 
        [updateStatusBid.rejected]: (state, action) => {
            console.log(action.error.message)
            state.loading = false
            state.error = action.error.message
            localStorage.setItem("bidState", JSON.stringify(state))
        },
    }
})



export const bidActions = bidSlice.actions
export default bidSlice


