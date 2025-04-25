"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { deleteMeal, fetchChefMeals } from "@/redux/slices/mealSlice";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
const MotionTr = motion(TableRow);

export default function ViewMeals() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { chefMeals, loading } = useAppSelector(
    (store: RootState) => store.meal
  );

  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [, setDeleteTargetMealId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchChefMeals());
  }, [dispatch]);

  const toggleMealDetails = (id: string) => {
    setExpandedMeal(expandedMeal === id ? null : id);
  };

  const handleDeleteMeal = (mealId: string) => {
    if (!mealId) return;
    dispatch(deleteMeal(mealId));
    setDeleteTargetMealId(null);
  };
  if (loading) return <LoadingSpinner message="Loading your meals..." />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            My Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop view */}
          {chefMeals.length > 0 ? (
            <div className="hidden xl:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Category</TableHead>
                    <TableHead className="text-center">Cuisine</TableHead>
                    <TableHead className="text-center">Price (₹)</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">
                      Prep Time (min)
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chefMeals.map((meal, ind) => (
                    <MotionTr
                      key={meal._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: ind * 0.1 }}
                    >
                      <TableCell>{meal.name}</TableCell>
                      <TableCell className="text-center">
                        {meal.category}
                      </TableCell>
                      <TableCell className="text-center">
                        {meal.cuisine}
                      </TableCell>
                      <TableCell className="text-center">
                        ₹{meal.price}
                      </TableCell>
                      <TableCell className="text-center">
                        {meal.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {meal.preparationTime} min
                      </TableCell>
                      <TableCell className="text-center flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(`/chef-dashboard/meals/${meal._id}`)
                          }
                          className="cursor-pointer"
                        >
                          <Edit2 className="text-black w-6 h-6 animate-pulse mr-1" />
                          Edit
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeleteTargetMealId(meal._id)}
                              className="cursor-pointer"
                            >
                              <Trash2 className="text-black w-6 h-6 animate-pulse mr-1" />
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this meal? This
                                action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              {loading ? (
                                <Button variant="destructive">
                                  <Loader2 className="text-black w-6 h-6 animate-spin mr-1" />
                                  Deleting...
                                </Button>
                              ) : (
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeleteMeal(meal._id)}
                                  className="cursor-pointer"
                                >
                                  Confirm Delete
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </MotionTr>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>Add Meals to see here</div>
          )}

          {/* Mobile & Tablet View */}
          <div className="xl:hidden space-y-4">
            {chefMeals.map((meal) => (
              <Card key={meal._id} className="overflow-hidden">
                <div
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMealDetails(meal._id)}
                >
                  <h3 className="font-medium">{meal.name}</h3>
                  <span>₹{meal.price}</span>
                </div>

                {expandedMeal === meal._id && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">Category:</p>
                        <p>{meal.category}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Cuisine:</p>
                        <p>{meal.cuisine}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Quantity:</p>
                        <p>{meal.quantity}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Prep Time:</p>
                        <p>{meal.preparationTime} min</p>
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          router.push(`/chef-dashboard/meals/${meal._id}`)
                        }
                      >
                        <Edit2 className="text-black w-6 h-6 animate-pulse mr-1" />
                        Edit
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => setDeleteTargetMealId(meal._id)}
                          >
                            <Trash2 className="text-black w-6 h-6 animate-pulse mr-1" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this meal? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            {loading ? (
                              <Button variant="destructive">
                                <Loader2 className="text-black w-6 h-6 animate-spin mr-1" />
                                Deleting...
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteMeal(meal._id)}
                              >
                                Confirm Delete
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
