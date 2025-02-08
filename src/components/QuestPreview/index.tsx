import { IQuestPreview } from "@/interfaces/quest";
import { Card, CardContent } from "../ui/card";
import QuestMetrics from "./QuestMetrics";

interface QuestPreviewProps {
    quest: IQuestPreview;
};

const QuestPreview = ({ quest }: QuestPreviewProps) => {
    return (
        <Card key={quest.id} className="w-full p-2">
            {quest.previewImageUrl && (
                <div className="flex justify-center p-2">
                    <img
                        src={quest.previewImageUrl}
                        alt={quest.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
            <CardContent className="p-4">
                <h3 className="text-lg font-bold">{quest.title}</h3>
                {quest.description && <p className="text-sm text-gray-600">{quest.description}</p>}
                <QuestMetrics
                    rating={quest?.rating ?? 1}
                    complexity={quest.complexity}
                />
            </CardContent>
        </Card>
    );
};

export default QuestPreview;
