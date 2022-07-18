import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";
import { authHeader } from "../config/auth-header";

export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    async () => {
        try{
            const response = await api.get(
                '/api/v1/notification',
                authHeader()
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(errorMessage)
        }
    }
)
