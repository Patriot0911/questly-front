import { IAuthLoginPayload, IAuthState } from '@/interfaces/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthState = {
    isLoading: false,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IAuthLoginPayload>) => ({
            ...state,
            isAuthenticated: true,
            userName: action.payload.userName,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
        }),
        authLogOut: () => ({
            ...initialState,
        }),
    },
});

export const { logIn, authLogOut } = authSlice.actions;
export default authSlice.reducer;
