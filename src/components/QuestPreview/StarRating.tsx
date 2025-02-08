import { Flame, Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    complexity: number;
};

const StarRating = ({ rating, complexity }: StarRatingProps) => {
    const getStarFill = (index: number) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;
        return `polygon(0% 0%, ${fillPercentage}% 0%, ${fillPercentage}% 100%, 0% 100%)`;
    };

    return (
        <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 flex items-start flex-col">
                <span className="mb-1">Rating</span>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative w-5 h-5">
                            <Star className="absolute w-full h-full" fill="#111" />
                            <div
                                className="absolute w-full h-full overflow-hidden"
                                style={{ clipPath: getStarFill(i) }}
                            >
                                <Star className="w-full h-full" fill="yellow" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2 flex items-start flex-col">
                <span className="mb-1">Complexity</span>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative w-5 h-5">
                            <Flame className="absolute w-full h-full" fill="#111" />
                            <div
                                className="absolute w-full h-full overflow-hidden"
                                style={{ clipPath: `polygon(0% 0%, ${Math.max(0, Math.min(1, complexity - i)) * 100}% 0%, ${Math.max(0, Math.min(1, complexity - i)) * 100}% 100%, 0% 100%)` }}
                            >
                                <Flame className="w-full h-full" fill="orange" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StarRating;
