export interface IQuestPreview {
    id: string;
    authorId: string;
    title: string;
    description: string;
    status: Status;
    difficulty: Difficulty;
    timeLimit: number;
    totalTasks: number;
    totalAttempts: number;
    totalSolved: number;
    avgSolvedTime: number;
    avgRating: number;
    updatedAt: string;
    createdAt: string;
    author: IQuestAuthor;
    previewImageUrl: string; // not yet done in backend
};

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
};

export enum Status {
    UNPUBLISHED = "UNPUBLISHED",
    PUBLISHED = "PUBLISHED"
};

export interface IQuestAuthor {
    id: string;
    fullName: string;
    createdAt: string;
}

export interface IQuestComment {
    id: string
    authorId: string
    authorName: string
    authorAvatar: string
    content: string
    createdAt: string
};