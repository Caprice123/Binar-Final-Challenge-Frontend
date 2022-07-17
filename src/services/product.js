import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

import { authHeader } from '../config/auth-header'

export const getWishlist = createAsyncThunk(
    'product/getWishlist',
    async () => {
        try{
            const response = await api.get(
                `/api/v1/products/wishlist`,
                authHeader(),
            )
            const data = response.data
            return data
        } catch(err){
            console.log(err)
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (payload) => {
        
        try{
            console.log(payload)
            const response = await api.get(
                `/api/v1/products`,
                {
                    params: payload
                }
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

// TODO: change to getProductBidByProductID
export const getProductOneByID = createAsyncThunk(
    'product/getProductOneByID',
    async (payload) => {
        try{
            const { productId } = payload
            const response = await api.get(
                `/api/v1/products/${productId}`,
            )
            const data = response.data
            return data
        } catch(err){
            const errorMessage = err.response.data
            throw new Error(JSON.stringify(errorMessage))
        }
    }
)

// TODO: change to getProductBidByProductID
export const getProductBidByProductID = createAsyncThunk(
    'product/getProductBidByProductID',
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
            throw new Error(JSON.stringify(errorMessage))
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

            await api.post(
                '/api/v1/productsimageupload',
                formData,
                authHeader('multipart/form-data')
            )

            return dataAddProduct
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
                {
                    request_price: bidPrice
                },
                authHeader(),
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

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (payload) => {
        try{
            const { productId, name, price, categoryId, description, productImages } = payload
            console.log(payload)
            const requestBody = {
                name,
                price,
                category_id: categoryId,
                description
            }

            const formData = new FormData()
            productImages.forEach(img => {
                formData.append("files", img.file)
            })
            formData.append("productId", productId)

            const [responsePut, responseProductImage] = await Promise.all([
                api.put(
                    `/api/v1/products/${productId}`,
                    requestBody,
                    authHeader()
                ),

                api.post(
                    '/api/v1/productsimageupload',
                    formData,
                    authHeader('multipart/form-data')
                )
            ])
            const datas = responsePut.data
            return datas
        } catch(err){
            const errorMessage = err.response.data
            throw Error(JSON.stringify(errorMessage))
        }
    }
)
