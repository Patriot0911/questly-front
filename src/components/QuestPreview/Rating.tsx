
interface RatingProps {
    rating: number;
};

const Rating = ({ rating }: RatingProps) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - Math.ceil(rating); // Number of empty stars

    return (
        <div className="flex items-center">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <svg
                    key={`full-${index}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 15.27l4.95 3.73-1.89-5.72 4.61-3.91h-5.73L10 0 7.06 9.37H1.33l4.61 3.91-1.89 5.72L10 15.27z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 15.27l4.95 3.73-1.89-5.72 4.61-3.91h-5.73L10 0 7.06 9.37H1.33l4.61 3.91-1.89 5.72L10 15.27z"
                        clipRule="evenodd"
                        opacity="0.5" // This is to make the star appear like half-filled
                    />
                </svg>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <svg
                    key={`empty-${index}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-300"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 15.27l4.95 3.73-1.89-5.72 4.61-3.91h-5.73L10 0 7.06 9.37H1.33l4.61 3.91-1.89 5.72L10 15.27z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}
        </div>
    );
};

export default Rating;
