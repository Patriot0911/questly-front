'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Difficulty, IQuestPreview, Status } from "@/interfaces/quest";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import QuestPreview from "../QuestPreview";

const mockQuests: IQuestPreview[] = Array.from({ length: 20 }, (_, index) => ({
    id: (index + 1).toString(),
    authorId: (index + 1).toString(),
    status: Status.PUBLISHED,
    timeLimit: Math.floor(Math.random() * 40) + 20,
    totalTasks: Math.floor(Math.random() * 10) + 5,
    totalAttempts: Math.floor(Math.random() * 100) + 50,
    totalSolved: Math.floor(Math.random() * 40) + 10,
    avgSolvedTime: Math.floor(Math.random() * 30) + 15,
    title: `Quest ${index + 1}`,
    description: `Description for Quest ${index + 1}`,
    avgRating: Math.random() * 4 + 1,
    difficulty: Difficulty.EASY,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    author: {
        id: (index + 1).toString(),
        fullName: `Author ${index + 1}`,
        createdAt: new Date().toISOString(),
    },
    previewImageUrl: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1081590/header.jpg?t=1627988160`,
}));

const fetchQuests = async (page: number, pageSize: number): Promise<{ quests: IQuestPreview[], totalPages: number }> => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const quests = mockQuests.slice(start, end);
    return { quests, totalPages: Math.ceil(mockQuests.length / pageSize) };
};

const QuestGallery = () => {
    const [quests, setQuests] = useState<IQuestPreview[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [order, setOrder] = useState("asc");
    const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc");
    const pageSize = 8;

    useEffect(() => {
        const loadQuests = async () => {
            const data = await fetchQuests(page, pageSize);
            setQuests(data.quests);
            setTotalPages(data.totalPages);
        };
        loadQuests();
    }, [page]);

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center">
                <div className="h-full flex items-center relative">
                    <Search className="w-4 h-4 absolute left-3 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search by quest name..."
                        className="pl-10 pr-4 py-2 bg-white border border-black rounded-xl h-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Select>
                        <SelectTrigger className="bg-white border text-gray-500 border-black rounded-xl h-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-400">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="timeLimit">Time Limit</SelectItem>
                            <SelectItem value="totalTasks">Total Tasks</SelectItem>
                            <SelectItem value="totalAttempts">Total Attempts</SelectItem>
                            <SelectItem value="totalSolved">Total Solved</SelectItem>
                            <SelectItem value="avgSolvedTime">Average Solving Time</SelectItem>
                            <SelectItem value="avgRating">Rating</SelectItem>
                            <SelectItem value="createdAt">Created At</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={toggleOrder}
                        className="border border-black bg-white hover:bg-gray-200 rounded-xl h-10 px-3 flex items-center"
                    >
                        {order === "asc" ? (
                            <ChevronUp className="text-black" size={16} />
                        ) : (
                            <ChevronDown className="text-black" size={16} />
                        )}
                    </Button>
                </div>
                <div className="hidden xl:block"></div>
                <div className="p-2 border border-black bg-white rounded-xl w-full ml-auto">
                    <Pagination>
                        <PaginationContent className="flex justify-between items-center flex-nowrap">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="w-full"
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="px-4 text-nowrap">Page {page} of {totalPages}</span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="w-full"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-6">
                {quests.map((quest) => (
                    //<QuestDialog key={quest.id} quest={quest} />
                    <Link key={quest.id} href={`/quests/${quest.id}`}>
                        <QuestPreview quest={quest} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuestGallery;
