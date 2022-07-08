import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

import { authHeader } from '../config/auth-header'

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