import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../../../../interface';


export const productsApiSlice = createApi({
    reducerPath: "productsApi",
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
            query: () => {
                return {url: "/products"}
            },
        }),
    }),
})


export const { useGetProductsQuery } = productsApiSlice