import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICreatedQuest, IPassedQuest } from "@/interfaces/user";
import { Star } from "lucide-react";
import Image from "next/image";

interface QuestRatingProps {
    rating: number;
};

const QuestRating = ({ rating }: QuestRatingProps) => {
    return (
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full px-2 py-1 flex items-center text-sm font-bold">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {rating.toFixed(1)}
        </div>
    )
};

interface CreatedQuestItemProps {
    quest: ICreatedQuest;
};

const CreatedQuestItem = ({ quest }: CreatedQuestItemProps) => {
    return (
        <Card
            className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none mb-4 relative"
            style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
        >
            <QuestRating rating={quest.rating} />
            <CardHeader>
                <CardTitle>{quest.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Image
                        src={quest.previewImageUrl || "/placeholder.svg"}
                        alt={quest.title}
                        width={100}
                        height={75}
                        className="rounded-lg object-cover"
                    />
                    <div>
                        <p className="text-gray-300">Created: {new Date(quest.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-300">Difficulty: {quest.difficulty}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

interface PassedQuestItemProps {
    quest: IPassedQuest;
};

const PassedQuestItem = ({ quest }: PassedQuestItemProps) => {
    return (
        <Card
            className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none mb-4 relative"
            style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
        >
            <QuestRating rating={quest.rating} />
            <CardHeader>
                <CardTitle>{quest.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Image
                        src={quest.previewImageUrl || "/placeholder.svg"}
                        alt={quest.title}
                        width={100}
                        height={75}
                        className="rounded-lg object-cover"
                    />
                    <div>
                        <p className="text-gray-300">Completed: {new Date(quest.completedAt).toLocaleDateString()}</p>
                        <p className="text-gray-300">Time: {Math.round(quest.timeToComplete / 60)} minutes</p>
                        <p className="text-gray-300">Difficulty: {quest.difficulty}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export { CreatedQuestItem, PassedQuestItem };
