import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// تعريف نوع المنتج
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

// دالة جلب المنتجات
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const Products: React.FC = () => {
  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {data?.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p>{product.description.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
