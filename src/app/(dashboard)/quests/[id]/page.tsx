"use client";
import QuestComments from "@/components/quest/QuestComments";
import QuestDetails from "@/components/quest/QuestDetails";
import QuestHeader from "@/components/quest/QuestHeader";
import QuestStats from "@/components/quest/QuestStats";
import { Difficulty, Status } from "@/interfaces/quest";
import { useParams } from "next/navigation";

const mockedQuest = {
    id: "1",
    authorId: "123",
    title: "The Lost Treasure",
    description: "Embark on an epic adventure to find the lost treasure hidden deep in the mountains.",
    status: Status.PUBLISHED,
    difficulty: Difficulty.EASY,
    timeLimit: 60,
    totalTasks: 10,
    totalAttempts: 50,
    totalSolved: 20,
    avgSolvedTime: 45,
    avgRating: 4.5,
    updatedAt: "2025-02-09T12:19:42.025Z",
    createdAt: "2025-02-08T10:15:30.000Z",
    author: {
        id: "123",
        fullName: "John Doe",
        createdAt: "2025-01-01T08:00:00.000Z"
    }
};

const QuestPage = () => {
    const { id } = useParams();

    const getMockedQuest = (id: string) => {
        return mockedQuest;
    };

    const quest = getMockedQuest(id as string);

    return (
        <div className="container mx-auto px-4 py-8">
            <QuestHeader quest={quest} />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <QuestDetails quest={quest} />
                <QuestStats quest={quest} />
            </div>
            <QuestComments questId={quest.id} />
        </div>
    );
};

export default QuestPage;
