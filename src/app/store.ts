import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/counter/cartSlice";

import authSlice from "./features/counter/authSlice";
import themeReducer from "./features/counter/themeSlice";
import { productsApiSlice } from "./features/counter/products/productsApiSlice";
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// إنشاء الـ store
const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    theme: themeReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // تعطيل فحص التسلسل لتجنب مشاكل مع الـ cookies
    }).concat(productsApiSlice.middleware),
});

export default store;
