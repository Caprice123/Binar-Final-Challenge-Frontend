import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
    loading: false,
    error: "",
}

const statusStateCached = JSON.parse(localStorage.getItem("statusState"))

const initialState = statusStateCached
                    ? statusStateCached
                    : defaultState

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload.status
            localStorage.setItem("statusState", JSON.stringify(state))
        },

        setError: (state, action) => {
            state.loading = false
            state.error = action.payload.message
            localStorage.setItem("statusState", JSON.stringify(state))
        }
    }, 
})



export const statusActions = statusSlice.actions
export default statusSlice
