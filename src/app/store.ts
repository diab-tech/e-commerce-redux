import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/counter/cartSlice";

import authSlice from "./features/counter/authSlice";
import themeReducer from "./features/counter/themeSlice";
import productsSlice from "./features/counter/products/productsSlice";
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// إنشاء الـ store
const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    theme: themeReducer,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // تعطيل فحص التسلسل لتجنب مشاكل مع الـ cookies
    }),
});

export default store;
