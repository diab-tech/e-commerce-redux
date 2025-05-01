import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "./Card";
import TruncatedText from "./TruncatedText";
import Button from "./ui/Button";
import ProductModal from "./ProductModal";
import { addToCart } from "../app/features/counter/cartSlice";
import { useAppDispatch } from "../hooks";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something wrong! : {error.message}</div>;

  return (
    <div className="w-full py-8 max-w-screen-xl mx-auto px-4 md:px-30 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
        {data?.map((product) => (
          <Card
            key={product.id}
            className="border p-4 rounded cursor-pointer w-[250px] h-[300px] mx-auto "
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-38 object-cover cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            />
            <TruncatedText
              text={product.title}
              maxLength={20}
              className="text-lg font-bold text-[var(--text-primary)] cursor-pointer hover:underline"
              tag="h2"
              onClick={() => setSelectedProduct(product)}
            />
            <p
              className="text-[var(--text-secondary)] text-sm mt-2 mb-2"
              onClick={() => setSelectedProduct(product)}
            >
              {product.description.substring(0, 50)}...
            </p>
            <div className="flex flex-row items-center justify-between ">
              <p className="text-gray-600 dark:text-gray-300 text-base leading-none">
                ${product.price}
              </p>
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      description: product.description,
                      quantity: 1,
                    }),
                  )
                }
              >
                Add to cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
