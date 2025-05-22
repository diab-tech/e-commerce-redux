

// ## In case of using React Query rather than RTK Query





// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Product } from "../../../../interface";
// import { axiosPublic } from "../../../../config/axios.config";
// import { RootState } from "../../../store";

// interface ProductState {
//     products: Product[];
//     loading: boolean;
//     error: string | null;
//     lastFetch: number | null;
// }

// const initialState: ProductState = {
//     products: [],
//     loading: false,
//     error: null,
//     lastFetch: null
// }

// // Create an AbortController instance to manage API call cancellation
// let abortController: AbortController | null = null;

// export const getProducts = createAsyncThunk(
//     "products/getProducts", 
//     async (_, thunkAPI) => {
//         // Cancel previous request if it exists
//         if (abortController) {
//             abortController.abort();
//         }
        
//         // Create a new AbortController
//         abortController = new AbortController();
        
//         try {
//             const response = await axiosPublic.get("https://fakestoreapi.com/products", {
//                 signal: abortController.signal
//             });
//             return response.data;
//         } catch (error) {
//             // Handle cancellation errors gracefully
//             if (axios.isCancel(error)) {
//                 console.log('Request canceled', error.message);
//                 return thunkAPI.rejectWithValue("Request was cancelled");
//             }
            
//             // Return meaningful error messages
//             const errorMessage = error instanceof Error 
//                 ? error.message 
//                 : "Unknown error occurred";
                
//             return thunkAPI.rejectWithValue(errorMessage);
//         } finally {
//             // Reset the AbortController after request completes or fails
//             abortController = null;
//         }
//     },
//     {
//         // Condition function to avoid unnecessary API calls
//         condition: (_, { getState }) => {
//             const state = getState() as RootState;
//             const { products, loading, lastFetch } = state.products;
            
//             // Don't fetch if already loading
//             if (loading) return false;
            
//             // Don't fetch if we have products and last fetch was less than 5 minutes ago
//             if (products.length > 0 && lastFetch) {
//                 const timeSinceLastFetch = Date.now() - lastFetch;
//                 if (timeSinceLastFetch < 5 * 60 * 1000) return false;
//             }
            
//             return true;
//         }
//     }
// )
// const productsSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getProducts.pending, (state:ProductState ) => {
//             state.loading = true;
//             state.error = null;
//         })
//         builder.addCase(getProducts.fulfilled, (state:ProductState, action) => {
//             state.loading = false;
//             state.products = action.payload;
//             state.lastFetch = Date.now(); // Update last fetch timestamp
//         })
//         builder.addCase(getProducts.rejected, (state:ProductState, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         })
//     }
// })
// export const productsSelector = ({products}:RootState)=> products
// export const { actions } = productsSlice;
// export default productsSlice.reducer;
