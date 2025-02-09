export interface IAuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    userName?: string;
    avatarUrl?: string;
    accessToken?: string;
    refreshToken?: string;
};

export interface IAuthLoginPayload {
    userName: string;
    accessToken?: string;
    refreshToken?: string;
};

export interface IInteraction {
    id: string;
    questSceneId: string;
    questId: string;
    penalty: number;
    dx: number;
    dy: number;
    radius: number;
    label: string;
    type: 'QUESTION' | 'TRANSITION';
    updatedAt: Date;
    createdAt: Date;
    question?: {
        template: string;
        settings: string;
        answers: string[];
    };
    transitions?: {
        sceneId: string;
    }[];
    dependencies: {
        dependencyId: string;
    }[];
};

export interface IScene {
    id: string;
    questId: string;
    label: string;
    width: number;
    height: number;
    updatedAt: Date;
    createdAt: Date;
};

export interface IQuestMeta {
    totalScenes: number;
    totalInteractions: number;
    totalQuestions: number;
};

export interface ILoadScenesPayload {
    data: IScene[];
};
export interface ILoadInteractionsPayload {
    data: IInteraction[];
};
export interface ILoadMetaPayload {
    data: IQuestMeta;
};
export interface ILoadConstructorPayload {
    scenes: IScene[];
    interactions: IInteraction[];
    meta: IQuestMeta;
};

export interface IConstructorState {
    isLoading: boolean;
    meta: IQuestMeta;
    interactions: IInteraction[];
    scenes: IScene[];
};
