import { IAuthLoginPayload, IAuthState } from '@/interfaces/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthState = {
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
        logOut: () => ({
            ...initialState,
        }),
    },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
