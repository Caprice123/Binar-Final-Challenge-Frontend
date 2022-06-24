import { configureStore } from '@reduxjs/toolkit'

import productSlice from './product'
import userSlice from './user'

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        user: userSlice.reducer,
    }
})

export default store