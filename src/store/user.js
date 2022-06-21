import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

import { City } from 'country-state-city'

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (payload) => {
        console.log(payload)
        const response = await api.put("/users")
        const datas = response.data
        return datas
        
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        availableCities: [],
        loading: false,
        error: ""
    },
    reducers: {
        getCities: (state) => {
            const allCities = City.getCitiesOfCountry('ID')
            state.availableCities = allCities
        }
    }, 
    extraReducers: {

    }
})



export const userActions = userSlice.actions
export default userSlice
