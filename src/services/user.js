import api from "../config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { authHeader } from '../config/auth-header'

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async () => {
        try{
            const response = await api.get(
                '/api/v1/currentuser',
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

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (payload) => {
        try{
            const { name, city, image, address, phone } = payload
            
    
            const payloadPost = {
                name,
                city,
                address,
                phone,
            }
    
            const responseUpdate = await api.put(
                "/api/v1/profil", 
                payloadPost, 
                authHeader()
            )
            
            if (image){
                const formData = new FormData()
                formData.append("file", image)
    
                await api.post(
                    '/api/v1/usersimageupload',
                    formData,
                    authHeader('multipart/form-data')
                )
            }
    
            const data = responseUpdate.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        
        try{

            const response = await api.post(
                '/api/v1/login', 
                payload
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        try{
            
            const response = await api.post(
                '/api/v1/register', 
                payload
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)