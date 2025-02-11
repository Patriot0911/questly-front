export interface IUser {
    id: string;
    username: string;
    avatarUrl: string;
    createdQuestsCount: number;
    passedQuestsCount: number;
}
  
export interface IQuestBase {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    previewImageUrl: string;
    rating: number;
}
  
export interface ICreatedQuest extends IQuestBase {
    createdAt: string;
}
  
export interface IPassedQuest extends IQuestBase {
    completedAt: string;
    timeToComplete: number;
}
