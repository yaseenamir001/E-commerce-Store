import { useState, useRef, useEffect } from "react";
import type { Review } from "@/api/productApi";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ReviewsSectionProps {
  reviews: Review[];
}

const ratingLabels = ["Excellent", "Good", "Average", "Below Average", "Poor"];

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  useEffect(() => {
    if (showAll && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAll]);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section ref={reviewsRef} className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] gap-8">
        <Card className="flex flex-col items-center justify-center bg-gray-100 border rounded-4xl text-center p-6 shadow-sm">
          <CardContent>
            <h3 className="text-5xl font-bold">{avgRating.toFixed(1)}</h3>
            <div className="flex justify-center mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.round(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-500 mt-4">
              Based on {reviews.length} reviews
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-sm">
          <CardContent className="space-y-4">
            {Object.entries(ratingCounts)
              .reverse()
              .map(([stars, count], idx) => {
                const percent = (count / reviews.length) * 100;
                return (
                  <div
                    key={stars}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="w-28 text-sm text-gray-700">
                      {ratingLabels[idx]}
                    </span>
                    <Progress value={percent} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Leave Comment"
          className="w-full border rounded-sm px-4 py-6 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="mt-10 space-y-6">
        {visibleReviews.map((review, i) => (
          <div key={i} className="border rounded-md p-6 bg-gray-100">
            <div className="flex items-center gap-4">
              <img
                src={`https://i.pravatar.cc/150?img=${i + 1}`}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{review.reviewerName}</p>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="mt-3 text-gray-700">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="mt-3 flex gap-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review-img"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center mt-10">
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-2 font-medium"
          >
            {showAll ? "Show Less" : "View More"}
          </Button>
        </div>
      )}
    </section>
  );
}
