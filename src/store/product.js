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

const productSlice = createSlice({
    name: 'product',
    initialState: {
    
    },
    reducers: {

    }, 
    extraReducers: {
        [addProduct.fulfilled]: (state, action) => {
            state.allCars = action.payload
        }, 

        [addProduct.rejected]: (state) => {
            state.allCars = []
        }
    }
})



export const productActions = productSlice.actions
export default productSlice
