import { Flame, Star } from "lucide-react";
import RatingDisplay from "./RatingDisplay";

interface QuestMetricsProps {
    rating: number;
    complexity: number;
};

const QuestMetrics = ({ rating, complexity }: QuestMetricsProps) => (
    <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
            <RatingDisplay value={rating} Icon={Star} color="yellow" />
        </div>
        <div className="col-span-2">
            <RatingDisplay value={complexity} Icon={Flame} color="orange" />
        </div>
    </div>
);

export default QuestMetrics;
