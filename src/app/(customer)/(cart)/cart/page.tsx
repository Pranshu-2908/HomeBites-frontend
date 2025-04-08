/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import ProtectedRoute from "@/utils/protectedRoute";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  decreaseCartQty,
  deleteCart,
  increaseCartQty,
  loadCart,
  removeCartItem,
} from "@/redux/slices/cartSlice";
import { SummaryModal } from "@/components/common/SummaryModal";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

interface CartItem {
  mealId: string;
  name: string;
  price: number;
  quantity: number;
}

interface MobileCartItemProps {
  item: CartItem;
  index: number;
}
const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, totalAmount } = useAppSelector(
    (store: RootState) => store.cart
  );
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);
  const handlePlaceOrder = async (preferredTime: {
    hour: number;
    minute: number;
  }) => {
    try {
      setIsSummaryOpen(false);
      setLoading(true);
      console.log(preferredTime);
      console.log(items);
      await axiosInstance.post("/order", {
        meals: items.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
        })),
        totalAmount,
        preferredTime,
      });

      toast.success("Order placed successfully!");
      await dispatch(deleteCart());
      router.push("/profile");
    } catch (err: any) {
      toast.error(err?.response.data.message || "Failed to place order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // For mobile view, group each item's information
  const MobileCartItem: React.FC<MobileCartItemProps> = ({ item, index }) => (
    <div className="mb-4 p-3 border rounded-md shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="font-medium">
          {index + 1} - <span className="font-bold">{item.name}</span>
        </span>
        <span>₹{item.price}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Quantity: {item.quantity}</span>
        <span>Total: ₹{item.price * item.quantity}</span>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => dispatch(increaseCartQty(item.mealId))}
        >
          <Plus size={16} />
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => dispatch(decreaseCartQty(item.mealId))}
        >
          <Minus size={16} />
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => dispatch(removeCartItem(item.mealId))}
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="mt-6 md:mt-10 px-2 md:px-4 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-3 md:p-6">
          {/* Desktop view */}
          <div className="hidden md:block">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Your cart is empty
              </p>
            ) : (
              <Table>
                <TableCaption className="text-xl">Your Cart</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Item No.</TableHead>
                    <TableHead className="text-center">Title</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="w-[150px] text-center">
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.price}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        ₹{item.price * item.quantity}
                      </TableCell>
                      <TableCell className="text-center flex items-center justify-center gap-2">
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() => dispatch(increaseCartQty(item.mealId))}
                        >
                          <Plus />
                        </Button>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() => dispatch(decreaseCartQty(item.mealId))}
                        >
                          <Minus />
                        </Button>
                        <Button
                          variant={"destructive"}
                          size={"icon"}
                          onClick={() => dispatch(removeCartItem(item.mealId))}
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-center">
                      ₹{totalAmount}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <h2 className="text-xl font-semibold text-center mb-4">
              Your Cart
            </h2>
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Your cart is empty
              </p>
            ) : (
              <>
                {items.map((item, ind) => (
                  <MobileCartItem key={ind} item={item} index={ind} />
                ))}
                <div className="mt-4 p-3 border-t font-semibold flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {items.length <= 0 ? (
          <div></div>
        ) : (
          <div className="flex flex-col gap-4 my-4 md:my-8">
            {/* Promo code section */}
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full">
              <p className="text-gray-600">
                If you have a promo code, enter it here:
              </p>
              <div className="mt-2 flex bg-gray-200 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 bg-transparent outline-none"
                />
                <button className="bg-black text-white px-4 py-2 whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            {/* Cart totals section */}
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full">
              <h2 className="text-lg font-semibold">Cart Totals</h2>
              <div className="flex justify-between text-gray-600 mt-2">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-gray-600">
                <p>Tax</p>
                <p>₹{(totalAmount * 0.18).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Platform Fee</p>
                <p>₹10</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>₹{(totalAmount + totalAmount * 0.18 + 10).toFixed(2)}</p>
              </div>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                onClick={() => setIsSummaryOpen(true)}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
      <SummaryModal
        open={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        cartItems={items}
        totalAmount={totalAmount}
        onConfirm={(preferredTime) => handlePlaceOrder(preferredTime)}
        loading={loading}
      />
    </ProtectedRoute>
  );
};

export default Cart;
