'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { IQuestPreview } from "@/interfaces/quest";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import QuestDialog from "../QuestDialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const mockQuests: IQuestPreview[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Quest ${index + 1}`,
    description: `Description for Quest ${index + 1}`,
    rating: Math.random() * 4 + 1,
    complexity: Math.floor(Math.random() * 4) + 1,
    previewImageUrl: `https://media.discordapp.net/attachments/1020762140837163090/1337739555947937802/doc_2025-01-07_20-18-46.gif?ex=67a88a8c&is=67a7390c&hm=ed0379b4014356047b7dff5769a90145df0c1856ff25a6e8d38c28a3dd522259&=`,
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
                    <QuestDialog key={quest.id} quest={quest} />
                ))}
            </div>
        </div>
    );
};

export default QuestGallery;
