import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '../config/api'

import { authHeader } from '../config/auth-header'

export const rejectBid = createAsyncThunk(
    'bid/rejectBid',
    async (payload) => {
        try{
            const { bidsId } = payload
            const response = await api.put(
                `/bids/${bidsId}`,
                authHeader(),
                {
                    status: "rejected"
                }
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            return new Error(errorMessage)
        }
    }
)

export const acceptBid = createAsyncThunk(
    'bid/acceptBid',
    async (payload) => {
        try{
            const { bidsId } = payload
            const response = await api.put(
                `/bids/${bidsId}`,
                authHeader(),
                {
                    status: "accepted"
                }
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            return new Error(errorMessage)
        }
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