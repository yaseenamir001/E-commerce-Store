import { Heart } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
      <div className="rounded-full bg-muted p-6">
        <Heart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
      <p className="text-sm text-muted-foreground">
        Start adding items you love ❤️
      </p>
    </div>
  );
};

export default EmptyState;
