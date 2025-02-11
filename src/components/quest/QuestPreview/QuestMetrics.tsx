import { Star } from "lucide-react";
import RatingDisplay from "./RatingDisplay";

interface QuestMetricsProps {
    rating: number;
};

const QuestMetrics = ({ rating }: QuestMetricsProps) => (
    <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
            <RatingDisplay value={rating} Icon={Star} color="yellow" />
        </div>
    </div>
);

export default QuestMetrics;
