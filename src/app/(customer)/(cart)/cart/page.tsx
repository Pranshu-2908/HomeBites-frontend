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

const Cart: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Table>
            <TableCaption className="text-xl">Your Cart</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Items</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="text-center">Sandwich</TableCell>
                <TableCell className="text-center">150</TableCell>
                <TableCell className="text-center">3</TableCell>
                <TableCell className="text-center">450</TableCell>
                <TableCell className="flex items-center justify-evenly">
                  <Button variant={"outline"} size={"icon"}>
                    <Plus />
                  </Button>
                  <Button variant={"outline"} size={"icon"}>
                    <Minus />
                  </Button>
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    className="text-black"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-center">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-8 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-lg font-semibold">Cart Totals</h2>
            <div className="flex justify-between text-gray-600 mt-2">
              <p>Subtotal</p>
              <p>$10</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>$12</p>
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
              <button className="bg-black text-white px-4 py-2">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
