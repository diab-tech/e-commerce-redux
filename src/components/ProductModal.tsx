import React, { useEffect } from "react";
import Button from "./ui/Button";
import { addToCart, clearMessages } from "../app/features/counter/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useAppDispatch();
  const { loading, error, successMessage } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
        className: "bg-green-500 text-white rounded-md shadow-lg p-4",
      });
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
        className: "bg-red-500 dark:bg-red-400 text-white rounded-md shadow-lg p-4",
      });
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{product.title}</h2>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
        <p className="text-[var(--text-primary)] mb-2">
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p className="text-[var(--text-secondary)] mb-4">{product.description}</p>
        <div className="flex justify-between">
          <Button variant="default" size="sm" onClick={onClose}>
            Close
          </Button>
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
            disabled={loading}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
