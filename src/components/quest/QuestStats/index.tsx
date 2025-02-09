import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestPreview } from "@/interfaces/quest";

interface QuestPreviewProps {
  quest: IQuestPreview;
};

const QuestStats = ({ quest }: QuestPreviewProps) => {
  return (
    <Card
      className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
      style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
    >
      <CardHeader>
        <CardTitle className="text-xl">Quest Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold text-gray-300">Total Attempts</dt>
            <dd>{quest.totalAttempts}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Total Solved</dt>
            <dd>{quest.totalSolved}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Avg. Solved Time</dt>
            <dd>{Math.round(quest.avgSolvedTime / 60)} minutes</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Avg. Rating</dt>
            <dd>{quest.avgRating.toFixed(1)} / 5</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
};

export default QuestStats;

