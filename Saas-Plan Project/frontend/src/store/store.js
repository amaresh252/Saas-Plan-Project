import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../auth/AuthSlice'
import planReducer from '../superadmin/PlansSlice'
import cartReducer from '../cart/CartSlice'
import orderReducer from '../order/AdminOrderSlice'
export default configureStore({
  reducer: {
   auth:authReducer,
   plans:planReducer,
   cart:cartReducer,
   order:orderReducer
  },
})