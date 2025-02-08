import { LucideProps, Star } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface RatingDisplayProps {
    value: number;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    color: string;
};

const RatingDisplay = ({ value, Icon, color }: RatingDisplayProps) => (
    <div className="flex flex-col items-start">
        <span className="mb-1">{Icon === Star ? "Rating" : "Complexity"}</span>
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="relative w-5 h-5">
                    <Icon className="absolute w-full h-full" fill="#111" />
                    <div
                        className="absolute w-full h-full overflow-hidden"
                        style={{ clipPath: `polygon(0% 0%, ${Math.max(0, Math.min(1, value - i)) * 100}% 0%, ${Math.max(0, Math.min(1, value - i)) * 100}% 100%, 0% 100%)` }}
                    >
                        <Icon className="w-full h-full" fill={color} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default RatingDisplay;