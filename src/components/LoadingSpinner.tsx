import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-white/70 z-50"
          : "flex items-center justify-center"
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-2 animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}
