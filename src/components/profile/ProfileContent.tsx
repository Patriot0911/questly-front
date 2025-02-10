"use client";

import { ICreatedQuest, IPassedQuest, IUser } from "@/interfaces/user";
import { useEffect, useState } from "react";
import QuestTabs from "./QuestTabs";
import UserProfile from "./UserProfile";

// Mock function to fetch user data
async function getUserData(id: string): Promise<IUser> {
    return {
        id,
        username: "JohnDoe",
        avatarUrl: "/placeholder.svg",
        createdQuestsCount: 5,
        passedQuestsCount: 10,
    };
};

// Mock function to fetch created quests
async function getCreatedQuests(userId: string): Promise<ICreatedQuest[]> {
    return [
        {
            id: "1",
            title: "Quest 1",
            difficulty: "EASY",
            createdAt: "2023-06-01T10:00:00Z",
            previewImageUrl: "/placeholder.svg",
            rating: 4.5,
        },
        {
            id: "2",
            title: "Quest 2",
            difficulty: "MEDIUM",
            createdAt: "2023-06-15T14:30:00Z",
            previewImageUrl: "/placeholder.svg",
            rating: 3.8,
        },
    ];
};

// Mock function to fetch passed quests
async function getPassedQuests(userId: string): Promise<IPassedQuest[]> {
    return [
        {
            id: "3",
            title: "Quest 3",
            difficulty: "HARD",
            completedAt: "2023-06-20T09:15:00Z",
            timeToComplete: 3600,
            previewImageUrl: "/placeholder.svg",
            rating: 4.2,
        },
        {
            id: "4",
            title: "Quest 4",
            difficulty: "MEDIUM",
            completedAt: "2023-06-25T16:45:00Z",
            timeToComplete: 2700,
            previewImageUrl: "/placeholder.svg",
            rating: 3.9,
        },
    ];
};

interface ProfileContentProps {
    userId: string
};

const ProfileContent = ({ userId }: ProfileContentProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [createdQuests, setCreatedQuests] = useState<ICreatedQuest[]>([]);
    const [passedQuests, setPassedQuests] = useState<IPassedQuest[]>([]);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useEffect(() => {
        getUserData(userId).then(setUser);
        getCreatedQuests(userId).then(setCreatedQuests);
        getPassedQuests(userId).then(setPassedQuests);
        setIsCurrentUser(true); // For demonstration purposes
    }, [userId]);

    if (!user) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-bg-dark min-h-screen text-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <UserProfile user={user} isCurrentUser={isCurrentUser} />
          </div>
          <div className="md:w-2/3">
            <QuestTabs createdQuests={createdQuests} passedQuests={passedQuests} />
          </div>
        </div>
      </div>
    );
};

export default ProfileContent;