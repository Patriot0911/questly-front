export interface IAuthState {
    isAuthenticated: boolean;
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
