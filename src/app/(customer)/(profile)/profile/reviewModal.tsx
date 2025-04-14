import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/redux/hooks";
import { addReview } from "@/redux/slices/reviewSlice";
import { Star } from "lucide-react";
import { toast } from "sonner";
interface meal {
  _id: string;
  name: string;
  price: number;
}
interface OrderItem {
  mealId: meal;
  quantity: number;
}
interface Customer {
  _id: string;
  name: string;
}
interface Order {
  _id: string;
  customerId: Customer;
  chefId: string;
  meals: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "accepted"
    | "preparing"
    | "completed"
    | "cancelled"
    | "rejected";
  createdAt?: Date;
}
interface ReviewModalProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ order, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState(() =>
    order.meals.map((item) => ({
      mealId: item.mealId._id,
      name: item.mealId.name,
      rating: 0,
      comment: "",
    }))
  );
  const handleRatingChange = (index: number, rating: number) => {
    const updated = [...reviews];
    updated[index].rating = rating;
    setReviews(updated);
  };

  const handleCommentChange = (index: number, comment: string) => {
    const updated = [...reviews];
    updated[index].comment = comment;
    setReviews(updated);
  };

  const handleSubmit = () => {
    dispatch(addReview({ orderId: order._id, mealReviews: reviews }))
      .unwrap()
      .then(() => {
        toast.success("Review posted. Thanks a lot for your feedback!!!");
        onClose();
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Your Meals</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {reviews.map((review, index) => (
            <div
              key={review.mealId}
              className="border rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">{review.name}</h3>

              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`cursor-pointer ${
                      review.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(index, star)}
                  />
                ))}
              </div>

              <Textarea
                placeholder="Leave a comment"
                value={review.comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <Button className="w-full mt-6 cursor-pointer" onClick={handleSubmit}>
          Submit Reviews
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
