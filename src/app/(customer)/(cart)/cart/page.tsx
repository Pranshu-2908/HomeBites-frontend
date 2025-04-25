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
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  decreaseCartQty,
  deleteCart,
  increaseCartQty,
  loadCart,
  removeCartItem,
} from "@/redux/slices/cartSlice";
import { SummaryModal } from "@/app/(customer)/(cart)/cart/SummaryModal";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axiosInstance";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";

const MotionTr = motion(TableRow);

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
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, totalAmount, cartLoading } = useAppSelector(
    (store: RootState) => store.cart
  );
  const [loadingAction, setLoadingAction] = useState<{
    id: string;
    type: "add" | "minus" | "delete";
  } | null>(null);
  const handleCartAction = async (
    id: string,
    type: "add" | "minus" | "delete"
  ) => {
    setLoadingAction({ id, type });

    try {
      if (type === "add") await dispatch(increaseCartQty(id)).unwrap();
      else if (type === "minus") await dispatch(decreaseCartQty(id)).unwrap();
      else if (type === "delete") await dispatch(removeCartItem(id)).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("unable to perform the action");
    } finally {
      setLoadingAction(null);
    }
  };

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

      const res = await axiosInstance.post("/order", {
        meals: items.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
        })),
        totalAmount,
        preferredTime,
      });

      const orderId = res.data.order._id;

      //stripe checkout session creation
      const checkoutRes = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          cartItems: items,
          orderId,
        }
      );

      const checkoutUrl = checkoutRes.data.url;

      // redirect user to stripe payment page
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Stripe checkout session URL not received.");
      }
      await dispatch(deleteCart());
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
          onClick={() => handleCartAction(item.mealId, "add")}
          disabled={
            loadingAction?.id === item.mealId && loadingAction?.type === "add"
          }
        >
          {loadingAction?.id === item.mealId &&
          loadingAction?.type === "add" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus size={16} />
          )}
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleCartAction(item.mealId, "minus")}
          disabled={
            loadingAction?.id === item.mealId && loadingAction?.type === "minus"
          }
        >
          {loadingAction?.id === item.mealId &&
          loadingAction?.type === "minus" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Minus size={16} />
          )}
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => handleCartAction(item.mealId, "delete")}
          disabled={
            loadingAction?.id === item.mealId &&
            loadingAction?.type === "delete"
          }
        >
          {loadingAction?.id === item.mealId &&
          loadingAction?.type === "delete" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash size={16} />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-6 md:mt-10 px-2 md:px-4 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-3 md:p-6">
          {/* Desktop view */}
          <div className="hidden md:block">
            {cartLoading ? (
              <LoadingSpinner message="Loading your cart..." />
            ) : items.length === 0 ? (
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
                  <AnimatePresence>
                    {items.map((item, ind) => (
                      <MotionTr
                        key={ind}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="transition-all"
                      >
                        <TableCell>{ind + 1}</TableCell>
                        <TableCell className="text-center">
                          {item.name}
                        </TableCell>
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
                            onClick={() => handleCartAction(item.mealId, "add")}
                            disabled={
                              loadingAction?.id === item.mealId &&
                              loadingAction?.type === "add"
                            }
                            className="cursor-pointer"
                          >
                            {loadingAction?.id === item.mealId &&
                            loadingAction?.type === "add" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Plus />
                            )}
                          </Button>
                          <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() =>
                              handleCartAction(item.mealId, "minus")
                            }
                            disabled={
                              loadingAction?.id === item.mealId &&
                              loadingAction?.type === "minus"
                            }
                            className="cursor-pointer"
                          >
                            {loadingAction?.id === item.mealId &&
                            loadingAction?.type === "minus" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Minus />
                            )}
                          </Button>
                          <Button
                            variant={"destructive"}
                            size={"icon"}
                            onClick={() =>
                              handleCartAction(item.mealId, "delete")
                            }
                            disabled={
                              loadingAction?.id === item.mealId &&
                              loadingAction?.type === "delete"
                            }
                            className="cursor-pointer"
                          >
                            {loadingAction?.id === item.mealId &&
                            loadingAction?.type === "delete" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash />
                            )}
                          </Button>
                        </TableCell>
                      </MotionTr>
                    ))}
                  </AnimatePresence>
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
                  <motion.div
                    key={ind}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: ind * 0.1 }}
                  >
                    <MobileCartItem item={item} index={ind} />
                  </motion.div>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full"
            >
              <p className="text-gray-600">
                If you have a promo code, enter it here:
              </p>
              <div className="mt-2 flex bg-gray-200 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 bg-transparent outline-none"
                />
                <button className="bg-black text-white px-4 py-2 whitespace-nowrap cursor-pointer">
                  Apply
                </button>
              </div>
            </motion.div>

            {/* Cart totals section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.7 }}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full"
            >
              <h2 className="text-lg font-semibold">Cart Totals</h2>
              <div className="flex justify-between text-gray-600 mt-2">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-gray-600">
                <p>Tax</p>
                <p>₹{0}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Platform Fee</p>
                <p>₹0</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>₹{totalAmount}</p>
              </div>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 cursor-pointer"
                onClick={() => setIsSummaryOpen(true)}
              >
                PROCEED TO CHECKOUT
              </button>
            </motion.div>
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
    </>
  );
};

export default Cart;
