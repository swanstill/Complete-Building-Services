"use client";
import { useState } from "react";
import { siteConfig } from "@/config/SiteConfig";
import ReviewCard from "./ReviewCard";
import LoadMoreButton from "./LoadMoreButton";
import { website } from "@/config/website";

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
    <section id="reviews" className="section reviews-section">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORDS FROM LOCAL CUSTOMERS</p>
            <h2 className="font-bold text-2xl md:text-4xl text-gray-900">
              Good work gets people talking.
            </h2>
          </div>
          <p>
            <a
              className="text-link"
              href={website.trustatraderUrl}
              target="_blank"
              rel="noreferrer"
            >
              {website.reviewSummary} on TrustATrader ↗
            </a>
            <br />
            <a
              href={siteConfig.reviewsData.reviewsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Customer feedback below from our existing Checkatrade reviews ↗
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsToShow.map((review) => (
            <ReviewCard
              key={`${review.name}-${review.date}-${review.serviceType}`}
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
