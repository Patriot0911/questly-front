import { QuestRating } from "@/components/profile/QuestItem";
import { IQuestPreview } from "@/interfaces/quest";
import { Card, CardContent } from "../../ui/card";

interface QuestPreviewProps {
    quest: IQuestPreview;
};

const QuestPreview = ({ quest }: QuestPreviewProps) => {
    console.log({ quest });
    return (
        <Card
            style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
            key={quest.id}
            className="w-full p-2 bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
        >
            {quest?.thumbnail ? (
                <div className="flex justify-center p-2">
                    <img
                        src={
                            `${process.env.NEXT_PUBLIC_API_URL}/files/serve/?id=${quest.thumbnail.id}&mimeType=${quest.thumbnail.mimeType}`
                        }
                        alt={quest.title}
                        className="object-cover w-full h-[200px]"
                    />
                </div>
            ) : (
                <div className="flex justify-center p-2">
                    <img
                        src="https://media.discordapp.net/attachments/1020762140837163090/1337739555947937802/doc_2025-01-07_20-18-46.gif?ex=67ac7f0c&is=67ab2d8c&hm=f349413a1bfcc3eb3bf905b46f96a8f3e0c107870180130a67f05c97e21e33ad&=" // replace with fallback later
                        alt={quest.title}
                        className="object-cover w-full h-[200px]"
                    />
                </div>
            )}
            <CardContent className="p-4 relative">
                <h3 className="text-lg font-bold">{quest.title}</h3>
                {quest.description && (
                    <p className="text-sm">
                        {quest.description.slice(0, 100)}
                        {quest.description.length > 50 ? '...' : ''}
                    </p>
                )}
                {quest.avgRating !== 0 && <QuestRating rating={quest.avgRating} />}
            </CardContent>
        </Card>
    );
};

export default QuestPreview;
