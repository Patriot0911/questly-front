'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { IQuestPreview } from "@/interfaces/quest";
import { useEffect, useState } from "react";
import QuestDialog from "../QuestDialog";

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
    const pageSize = 12;

    useEffect(() => {
        const loadQuests = async () => {
            const data = await fetchQuests(page, pageSize);
            setQuests(data.quests);
            setTotalPages(data.totalPages);
        };
        loadQuests();
    }, [page]);

    return (
        <div className="flex flex-col min-h-screen space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-6">
                {quests.map((quest) => (
                    <QuestDialog key={quest.id} quest={quest} />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-4">Page {page} of {totalPages}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default QuestGallery;