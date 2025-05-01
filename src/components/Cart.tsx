import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { updateQuantity, removeFromCart, clearCart } from "../app/features/counter/cartSlice";
import Button from "./ui/Button";
import ProductModal from "./ProductModal";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,var(--background-gradient-start),var(--background-gradient-end))] p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold text-[var(--text-primary)]">Your Cart</h1> */}
        {items.length > 0 && (
          <Button variant="danger" size="sm" onClick={handleClearCart}>
            Clear Cart
          </Button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-[var(--text-secondary)]">Your cart is empty! Add products now.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
            <thead>
              <tr className="border-b text-[var(--text-primary)]">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    />
                  </td>
                  <td className="p-4">
                    <span
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.title}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--text-primary)]">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="text-[var(--text-primary)]">{item.quantity}</span>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-primary)]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="p-4 text-right font-bold text-[var(--text-primary)]">
                  Total:
                </td>
                <td className="p-4 font-bold text-[var(--text-primary)]">${total.toFixed(2)}</td>
                <td className="p-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <ProductModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        product={selectedItem}
      />
    </div>
  );
};

export default Cart;
