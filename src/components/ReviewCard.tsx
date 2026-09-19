"use client";

interface ReviewCardProps {
  review: {
    name: string;
    rating: number;
    review: string;
    date: string;
    postalCode: string;
    serviceType: string;
  };
  sourceImage?: string;
  sourceAlt?: string;
}

const ReviewCard = ({ review, sourceImage, sourceAlt }: ReviewCardProps) => {
  const initial = review.name.charAt(0).toUpperCase();

  const avatarColors = [
    "#4285F4",
    "#EA4335",
    "#34A853",
    "#FBBC05",
    "#9C27B0",
    "#FF5722",
    "#00BCD4",
    "#607D8B",
  ];
  const colorIndex = review.name.charCodeAt(0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4 shadow-sm border border-gray-100">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
        &ldquo;{review.serviceType}&rdquo;
      </h3>

      <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 line-clamp-6">
        {review.review}
      </p>

      <hr className="border-gray-200" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
            style={{ backgroundColor: avatarColor }}
          >
            {initial}
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900 text-sm">
                {review.name}
              </span>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="#FBBC05"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-gray-500 text-xs">{review.date}</span>
          </div>
        </div>

        <img
          src={sourceImage || "/icons/checkatrade-review.png"}
          alt={sourceAlt || "Checkatrade"}
          className="w-8 h-8 shrink-0 object-contain"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
