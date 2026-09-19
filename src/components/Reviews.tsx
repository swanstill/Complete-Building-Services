"use client";
import { useState } from "react";
import { siteConfig } from "@/config/SiteConfig";
import ReviewCard from "./ReviewCard";
import LoadMoreButton from "./LoadMoreButton";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const sortedReviews = [...siteConfig.reviewsData.reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const reviewsToShow = sortedReviews.slice(0, currentPage * reviewsPerPage);
  const hasMoreReviews = reviewsToShow.length < sortedReviews.length;

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  return (
    <section id="reviews" className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center mb-10">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-900">
            We&apos;re Rated 9.81/10 On Checkatrade
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            Based on verified reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsToShow.map((review) => (
            <ReviewCard
              key={review.name}
              review={review}
              sourceImage={siteConfig.reviewsData.sourceImage}
              sourceAlt={siteConfig.reviewsData.source}
            />
          ))}
        </div>

        {hasMoreReviews && (
          <div className="flex justify-center mt-10">
            <LoadMoreButton onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
