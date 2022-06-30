import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

export const rejectBid = createAsyncThunk(
    'bid/rejectBid',
    async (payload) => {
        console.log(payload)
        const response = await api.get(`/transaction/${payload.transactionId}/reject`)
        const data = response.data
        return data
    }
)

export const acceptBid = createAsyncThunk(
    'bid/acceptBid',
    async (payload) => {
        console.log(payload)
        const response = await api.get(`/transaction/${payload.transactionId}/accept`)
        const data = response.data
        return data
    }
)

export const updateStatusBid = createAsyncThunk(
    'bid/updateStatusBid',
    async (payload) => {
        console.log(payload)
        const response = await api.put(`/transaction/${payload.transactionId}`, {
            status: payload.status,
        })
        const data = response.data
        return data
    }
)

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

    }, 
    extraReducers: {
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
            state.error = action.payload
            localStorage.setItem("bidState", JSON.stringify(state))
        },


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
            state.loading = false
            // error
            state.error = action.payload
            localStorage.setItem("bidState", JSON.stringify(state))
        },
    }
})



export const bidActions = bidSlice.actions
export default bidSlice


