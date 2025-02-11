import { IAuthLoginPayload, IAuthRefreshPayload, IAuthState } from '@/interfaces/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthState = {
    isLoading: true,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IAuthLoginPayload>) => ({
            ...state,
            isLoading: false,
            isAuthenticated: true,
            id: action.payload.id,
            tokenExpires: action.payload.tokenExpires,
            userName: action.payload.userName,
            avatarUrl: action.payload.avatarUrl,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
        }),
        authRefreshToken: (state, action: PayloadAction<IAuthRefreshPayload>) => ({
            ...state,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            tokenExpires: action.payload.tokenExpires,
        }),
        startLogging: (state) => ({
            ...state,
            isLoading: true,
        }),
        notLogged: (state) => ({
            ...state,
            isLoading: false,
        }),
        authLogOut: () => ({
            ...initialState,
            isLoading: false,
        }),
    },
});

export const { logIn, authLogOut, startLogging, notLogged, authRefreshToken, } = authSlice.actions;
export default authSlice.reducer;
