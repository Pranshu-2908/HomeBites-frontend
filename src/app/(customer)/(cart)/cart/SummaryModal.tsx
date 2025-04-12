import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/redux/slices/cartSlice";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Loader2 } from "lucide-react";
type PreferredTime = {
  hour: number;
  minute: number;
};

interface SummaryModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onConfirm: (preferredTime: PreferredTime) => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  open,
  loading,
  onClose,
  cartItems,
  totalAmount,
  onConfirm,
}) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between text-gray-600">
            <p>Tax</p>
            <p>₹{(totalAmount * 0.18).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Platform Fee</p>
            <p>₹10</p>
          </div>
          <hr />
          <div className="text-right font-bold text-lg">
            Total: ₹{(totalAmount + totalAmount * 0.18 + 10).toFixed(2)}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <label className="text-sm font-medium">
            Preferred Delivery Time:
          </label>

          {/* Hour Select */}
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(24)].map((_, i) => {
                const h = i.toString().padStart(2, "0");
                return (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <span className="text-lg font-semibold">:</span>

          {/* Minute Select */}
          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {[0, 15, 30, 45].map((m) => {
                const min = m.toString().padStart(2, "0");
                return (
                  <SelectItem key={min} value={min}>
                    {min}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {loading ? (
            <Button>
              <Loader2 />
              Placing Order...
            </Button>
          ) : (
            <Button
              onClick={() =>
                onConfirm({ hour: parseInt(hour), minute: parseInt(minute) })
              }
            >
              Place Order
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
