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
        try{
            const { name, price, categoryId, description, productImages } = payload
            console.log(payload)
            const responseBody = {
                name,
                price,
                category_id: categoryId,
                description
            }
            const responseAddProduct = await api.post(
                "/api/v1/products",
                responseBody,
                authHeader()
            )
            const dataAddProduct = responseAddProduct.data
            const productId = dataAddProduct.id

            const formData = new FormData()
            productImages.forEach(img => {
                formData.append("files", img.file)
            })
            formData.append("productId", productId)

            const responseAddProductImage = await api.post(
                '/api/v1/productsimageupload',
                formData,
                authHeader('multipart/form-data')
            )

            const dataAddProductImage = responseAddProductImage.data
            return dataAddProductImage
        } catch(err){
            const errorMessage = err.response.data
            throw Error(JSON.stringify(errorMessage))
        }
    }
)

export const addBidPrice = createAsyncThunk(
    'product/addBidPrice',
    async (payload) => {
        console.log(payload)
        const { productId, bidPrice } = payload
        try{
            const response = await api.post(
                `/api/v1/products/${productId}/bids`,
                authHeader(),
                {
                    request_price: bidPrice
                }
            )
            const datas = response.data
            return datas
        } catch(err){
            const errorMessage = err.response.data
            throw Error(JSON.stringify(errorMessage))
        }
    }
)

export const getAllCategories = createAsyncThunk(
    '/product/getAllCategories',
    async () => {
        try{
            const response = await api.get(
                '/api/v1/categories',
            )

            const datas = response.data
            return datas
        } catch(err){
            const errorMessage = err.response.data
            throw Error(JSON.stringify(errorMessage))
        }
    }
)
