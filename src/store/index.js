import { configureStore } from '@reduxjs/toolkit'

// import bidSlice from './bids'
// import productSlice from './product'
import statusSlice from './status'
import userSlice from './user'


const store = configureStore({
    reducer: {
        // bids: bidSlice.reducer,
        // product: productSlice.reducer,
        user: userSlice.reducer,
        status: statusSlice.reducer,
    }
})

export default store