import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (payload) => {
        console.log(payload)
        const response = await api.post("/product")
        const datas = response.data
        return datas
    }
)

export const addBidPrice = createAsyncThunk(
    'product/addBidPrice',
    async (payload) => {
        console.log(payload)
        const response = await api.post('/bidPrice')
        const datas = response.data
        return datas
    }
)

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
        
        [addBidPrice.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            // add more logic
            localStorage.setItem("productState", JSON.stringify(state))
        },
        
        [addBidPrice.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
            localStorage.setItem("productState", JSON.stringify(state))
        },
    }
})



export const productActions = productSlice.actions
export default productSlice
