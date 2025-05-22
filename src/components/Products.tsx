import React, { useState, useCallback, memo } from "react";

import { Card } from "./Card";
import TruncatedText from "./TruncatedText";
import Button from "./ui/Button";
import ProductModal from "./ProductModal";
import { addToCart } from "../app/features/counter/cartSlice";
import { useAppDispatch } from "../hooks";
import { Product } from "../interface";
import { useGetProductsQuery } from "../app/features/counter/products/productsApiSlice";

// ## if not using RTK Query

// Optimized fetch function with cancellation support
// const fetchProducts = async (): Promise<Product[]> => {
//   const controller = new AbortController();
//   try {
//     const response = await axiosPublic.get("https://fakestoreapi.com/products", {
//       signal: controller.signal
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isCancel(error)) {
//       console.log('Request was cancelled', error.message);
//     }
//     throw error;
//   }
// };

// Memoized ProductCard component for better performance
const ProductCard = memo(
  ({
    product,
    onSelectProduct,
    onAddToCart,
  }: {
    product: Product;
    onSelectProduct: (product: Product) => void;
    onAddToCart: (product: Product) => void;
  }) => {
    return (
      <Card
        key={product.id}
        className="border p-4 rounded cursor-pointer w-[250px] h-[300px] mx-auto"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-38 object-cover cursor-pointer"
          onClick={() => onSelectProduct(product)}
          loading="lazy" // Add lazy loading for images
        />
        <TruncatedText
          text={product.title}
          maxLength={20}
          className="text-lg font-bold text-[var(--text-primary)] cursor-pointer hover:underline"
          tag="h2"
          onClick={() => onSelectProduct(product)}
        />
        <p
          className="text-[var(--text-secondary)] text-sm mt-2 mb-2"
          onClick={() => onSelectProduct(product)}
        >
          {product.description.substring(0, 50)}...
        </p>
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300 text-base leading-none">
            ${product.price}
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </Card>
    );
  }
);

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useGetProductsQuery();

  
  // ## using React Query rather than RTK Query
  
  // Optimize React Query implementation
  // const { data, isLoading, error: queryError } = useQuery<Product[], Error>({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  //   gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  //   refetchOnWindowFocus: false, // Disable refetch on window focus for better performance
  //   retry: 1, // Limit retries for failed requests
  //   // Enable cancellation automatically via React Query
  // });

  // Memoize callback functions to prevent unnecessary re-renders
  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1,
        })
      );
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  if (isLoading)
    return <div className="w-full text-center py-8">Loading...</div>;
  if (error) return <div className="w-full text-center py-8 text-red-500">Error: {error.status}</div>;
  if (!data || !Array.isArray(data) || data.length === 0)
    return <div className="w-full text-center py-8">No products available</div>;

  return (
    <div className="w-full py-8 max-w-screen-xl mx-auto px-4 md:px-30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
