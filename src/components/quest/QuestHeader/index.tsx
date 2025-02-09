import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestPreview } from "@/interfaces/quest";

interface QuestHeaderProps {
  quest: IQuestPreview;
};

const QuestHeader = ({ quest }: QuestHeaderProps) => {
  return (
    <Card
      className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
      style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{quest.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={quest.previewImageUrl || "/placeholder.svg"}
            alt={quest.title}
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-lg font-semibold">By {quest.author.fullName}</p>
            <p className="text-gray-300">{quest.description}</p>
            <div className="mt-4 flex gap-4">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">{quest.difficulty}</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">{quest.status}</span>
            </div>
            <Button
              className="mt-4 bg-[#415bcf] hover:bg-[#3a51b9] text-white font-bold py-2 px-4 rounded"
            >
              Start Quest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default QuestHeader;

