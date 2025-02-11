"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICreatedQuest, IPassedQuest } from "@/interfaces/user";
import { Card, CardContent } from "../ui/card";
import { CreatedQuestItem, PassedQuestItem } from "./QuestItem";

interface QuestTabsProps {
    createdQuests: ICreatedQuest[];
    passedQuests: IPassedQuest[];
};

const QuestTabs = ({
    createdQuests,
    passedQuests,
}: QuestTabsProps) => {
    return (
        <Card
            className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
            style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
        >
            <CardContent className="p-6">
                <Tabs defaultValue="created" className="w-full">
                    <TabsList className="bg-gray-800 text-white mb-4 rounded-none">
                        <TabsTrigger value="created" className="flex-1 data-[state=active]:bg-[#415bcf] rounded-none">
                            Created Quests
                        </TabsTrigger>
                        <TabsTrigger value="passed" className="flex-1 data-[state=active]:bg-[#415bcf] rounded-none">
                            Passed Quests
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="created">
                        {createdQuests.map((quest) => (
                            <CreatedQuestItem key={quest.id} quest={quest} />
                        ))}
                    </TabsContent>
                    <TabsContent value="passed">
                        {passedQuests.map((quest) => (
                            <PassedQuestItem key={quest.id} quest={quest} />
                        ))}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default QuestTabs;
