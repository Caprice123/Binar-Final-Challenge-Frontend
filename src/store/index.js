import { configureStore } from '@reduxjs/toolkit'

import statusSlice from './status'
import userSlice from './user'


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        status: statusSlice.reducer,
    }
})

export default store