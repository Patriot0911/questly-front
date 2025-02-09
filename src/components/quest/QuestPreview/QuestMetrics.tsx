import { Difficulty } from "@/interfaces/quest";
import { Star } from "lucide-react";
import RatingDisplay from "./RatingDisplay";

interface QuestMetricsProps {
    rating: number;
    difficulty: Difficulty;
};

const QuestMetrics = ({ rating, difficulty }: QuestMetricsProps) => (
    <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
            <RatingDisplay value={rating} Icon={Star} color="yellow" />
        </div>
    </div>
);

export default QuestMetrics;
