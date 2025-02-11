export interface IAuthState {
    id?: string;
    isLoading: boolean;
    tokenExpires?: string;
    userName?: string;
    avatarUrl?: string;
    accessToken?: string;
    refreshToken?: string;
    isAuthenticated: boolean;
};

export interface IAuthLoginPayload {
    userName: string;
    id: string;
    tokenExpires?: string;
    avatarUrl?: string;
    accessToken?: string;
    refreshToken?: string;
};
export interface IAuthRefreshPayload {
    tokenExpires: string;
    accessToken: string;
    refreshToken: string;
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
    background: {
      id: string;
      mimeType: string;
      size: number;
      filePath: string;
      originalName: string;
      ownerId: string;
      createdAt: string;
    };
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
export interface ISelectScenePayload extends IScene {};

export interface IConstructorState {
    isLoading: boolean;
    meta: IQuestMeta;
    interactions: IInteraction[];
    scenes: IScene[];
    current: {
        createInteraction: boolean;
        scene?: IScene;
        interaction?: IInteraction;
    };
};
