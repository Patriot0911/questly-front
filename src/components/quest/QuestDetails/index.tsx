import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestPreview } from "@/interfaces/quest";

interface QuestDetailsProps {
  quest: IQuestPreview;
};

const QuestDetails = ({ quest }: QuestDetailsProps) => {
  return (
    <Card
      className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
      style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
    >
      <CardHeader>
        <CardTitle className="text-xl">Quest Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold text-gray-300">Time Limit</dt>
            <dd>{quest.timeLimit / 60} minutes</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Total Tasks</dt>
            <dd>{quest.totalTasks}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Created</dt>
            <dd>{new Date(quest.createdAt).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Last Updated</dt>
            <dd>{new Date(quest.updatedAt).toLocaleDateString()}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
};

export default QuestDetails;

