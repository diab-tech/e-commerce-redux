import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  successMessage: string | null;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  successMessage: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        image: string;
        description: string;
        quantity?: number;
      }>,
    ) => {
      state.loading = true;
      const { id, title, price, image, description, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, price, image, description, quantity });
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.successMessage = "Product added to cart successfully";
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.successMessage = "Product removed from cart successfully";
      state.loading = false;
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      state.loading = true;
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
          state.successMessage = "Product removed from cart successfully";
        } else {
          state.successMessage = "Quantity updated successfully";
        }
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.loading = false;
    },
    clearCart: (state) => {
      state.loading = true;
      state.items = [];
      state.total = 0;
      state.successMessage = "Cart cleared successfully";
      state.loading = false;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, clearMessages } =
  cartSlice.actions;
export default cartSlice.reducer;
