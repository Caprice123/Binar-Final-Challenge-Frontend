import { createSlice } from '@reduxjs/toolkit'
import { getAllCategories, getProductByID, addProduct, addBidPrice } from '../services/product'

const defaultState = {
    loading: false,
    error: ""
}

const productCached = JSON.parse(localStorage.getItem("productState"))

const initialState = productCached
                    ? productCached
                    : defaultState

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = ""
            localStorage.setItem("productState", JSON.stringify(state))
        }
    }, 
    extraReducers: {
        // getAllCategories
        [getAllCategories.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [getAllCategories.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [getAllCategories.rejected]: (state, action) => {
            const { message: errorMessage } = JSON.parse(action.error.message)
            state.loading = false
            state.error = errorMessage
            localStorage.setItem("bidState", JSON.stringify(state))
        },

        // get all bids
        [getProductByID.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [getProductByID.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            localStorage.setItem("bidState", JSON.stringify(state))
        },
        [getProductByID.rejected]: (state, action) => {
            const { message: errorMessage } = JSON.parse(action.error.message)
            state.loading = false
            state.error = errorMessage
            localStorage.setItem("bidState", JSON.stringify(state))
        },

        [addProduct.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("productState", JSON.stringify(state))
        },
        
        [addProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.products.push(action.payload)
            state.error = ""
            localStorage.setItem("productState", JSON.stringify(state))
        }, 
        
        [addProduct.rejected]: (state, action) => {
            state.loading = false
            // error
            state.error = action.error.message
            state.products = []
            localStorage.setItem("productState", JSON.stringify(state))
        },
        
        [addBidPrice.pending]: (state) => {
            state.loading = true
            state.error = ""
            localStorage.setItem("productState", JSON.stringify(state))
        },
        
        [addBidPrice.fulfilled]: (state, action) => {
            console.log(action)
            state.loading = false
            state.error = ""
            // add more logic
            localStorage.setItem("productState", JSON.stringify(state))
        },
        
        [addBidPrice.rejected]: (state, action) => {
            const { message: errorMessage } = JSON.parse(action.error.message)
            state.loading = false
            state.error = errorMessage
            localStorage.setItem("productState", JSON.stringify(state))
        },
    }
})



export const productActions = productSlice.actions
export default productSlice
