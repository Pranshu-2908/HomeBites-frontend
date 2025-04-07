"use client";
import React from "react";
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
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector(
    (store: RootState) => store.cart
  );
  return (
    <ProtectedRoute>
      <div className="mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Table>
            <TableCaption className="text-xl">Your Cart</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Item No.</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="w-[200px] text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell>{ind + 1}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.price}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">
                    ₹{item.price * item.quantity}
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      <Plus />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      <Minus />
                    </Button>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      className="text-black"
                      onClick={() => dispatch(removeFromCart(item.id))}
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
                <TableCell className="text-center">₹{totalAmount}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {items.length <= 0 ? (
          <div></div>
        ) : (
          <div className="flex flex-col-reverse md:flex-row justify-between my-8 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
              <h2 className="text-lg font-semibold">Cart Totals</h2>
              <div className="flex justify-between text-gray-600 mt-2">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-gray-600">
                <p>Tax</p>
                <p>₹{totalAmount * 0.18}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Platform Fee</p>
                <p>₹10</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>₹{totalAmount + totalAmount * 0.18 + 10}</p>
              </div>
              <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
              <p className="text-gray-600">
                If you have a promo code, enter it here:
              </p>
              <div className="mt-2 flex bg-gray-200 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 bg-transparent outline-none"
                />
                <button className="bg-black text-white px-4 py-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
