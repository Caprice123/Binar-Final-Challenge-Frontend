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

export const setBidPrice = createAsyncThunk(
    'product/setBidPrice',
    async (payload) => {
        console.log(payload)
        const response = await api.post('/bidPrice')
        const datas = response.data
        return datas
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: "",

    },
    reducers: {

    }, 
    extraReducers: {
        [addProduct.pending]: (state) => {
            state.loading = true
            state.error = ""
        },

        [addProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.products.push(action.payload)
            state.error = ""
        }, 

        [addProduct.rejected]: (state, action) => {
            state.loading = false
            // error
            state.error = action.payload
            state.products = []
        },

        [setBidPrice.pending]: (state) => {
            state.loading = true
            state.error = ""
        },

        [setBidPrice.fulfilled]: (state) => {
            state.loading = false
            state.error = ""
            // add more logic
        },

        [setBidPrice.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})



export const productActions = productSlice.actions
export default productSlice
