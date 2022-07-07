import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '../config/api'

import { authHeader } from '../config/auth-header'

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