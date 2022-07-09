import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

import { authHeader } from '../config/auth-header'

export const getProductByID = createAsyncThunk(
    'product/getProductByID',
    async (payload) => {
        try{
            const { productId } = payload
            const response = await api.get(
                `/api/v1/products/${productId}/bids`,
                authHeader()
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            return new Error(errorMessage)
        }
    }
)

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