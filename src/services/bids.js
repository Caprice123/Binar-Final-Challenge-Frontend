import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '../config/api'

import { authHeader } from '../config/auth-header'

export const checkBid = createAsyncThunk(
    'bid/checkBid',
    async (payload) => {
        try{
            const { productId } = payload
            const response = await api.post(
                `/api/v1/bids/check`,
                {
                    productId: productId,
                },
                authHeader(),
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

export const rejectBid = createAsyncThunk(
    'bid/rejectBid',
    async (payload) => {
        try{
            const { bidsId } = payload
            const response = await api.put(
                `/api/v1/bids/${bidsId}`,
                {
                    status: "rejected"
                },
                authHeader(),
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

export const acceptTransaction = createAsyncThunk(
    'bid/acceptTransaction',
    async (payload) => {
        try{
            const { bidsId } = payload
            const response = await api.put(
                `/api/v1/bids/${bidsId}`,
                {
                    status: "accepted"
                },
                authHeader(),
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)


export const acceptBid = createAsyncThunk(
    'bid/acceptBid',
    async (payload) => {
        try{
            const { bidsId } = payload
            const response = await api.put(
                `/api/v1/bids/${bidsId}`,
                {
                    status: "waiting_for_negotiation"
                },
                authHeader(),
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)
