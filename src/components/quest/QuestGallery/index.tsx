'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useAppSelector, } from "@/hooks/redux";
import { useUserSelector } from "@/hooks/redux/auth";
import { IQuestPreview, } from "@/interfaces/quest";
import { Search, SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import QuestPreview from "../QuestPreview";

const QuestGallery = ({ baseUrl, isAuth, }: { baseUrl: string; isAuth?: boolean; }) => {
    const [quests, setQuests] = useState<IQuestPreview[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [order, setOrder] = useState("asc");
    const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc");
    const [pageSize] = useState(8);

    const { isAuthenticated, accessToken, } = useAppSelector(useUserSelector);

    useEffect(() => {
        const loadQuests = async () => {
            const url = new URL(baseUrl);
            url.searchParams.append('pageSize', `${pageSize}`)
            url.searchParams.append('page', `${page}`);
            url.searchParams.append('sortOrder', 'asc');
            url.searchParams.append('status', 'UNPUBLISHED');
            if (isAuth && !isAuthenticated)
                return;
            const res = await fetch(url, {
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            console.log({ data });
            if (!data || !data.data)
                return;
            setQuests(data.data);
            setTotalPages(data.total);
        };
        loadQuests();
    }, [page, isAuth, baseUrl, isAuthenticated,]);

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center">
                <div className="h-full flex items-center relative">
                    <Search className="w-4 h-4 absolute left-3 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search by quest name..."
                        className="pl-10 pr-4 py-2 bg-white border border-black rounded-none h-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Select>
                        <SelectTrigger className="bg-white border text-gray-500 border-black rounded-none h-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-400">
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
                        className="border border-black bg-white hover:bg-gray-200 rounded-none h-10 px-3 flex items-center"
                    >
                        {order === "asc" ? (
                            <SortAsc className="text-black" size={16} />
                        ) : (
                            <SortDesc className="text-black" size={16} />
                        )}
                    </Button>
                </div>
                <div className="hidden xl:block"></div>
                <div
                    className="p-2 bg-white text-black border rounded-none w-full ml-auto"
                    style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
                >
                    <Pagination>
                        <PaginationContent className="flex justify-between items-center flex-nowrap">
                            <PaginationItem className="w-24">
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="w-full"
                                />
                            </PaginationItem>
                            <PaginationItem className="flex-1">
                                <span className="px-4 text-nowrap">Page {page} of {totalPages ?? 1}</span>
                            </PaginationItem>
                            <PaginationItem className="w-24">
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
