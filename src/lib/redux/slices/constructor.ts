import { ILoadScenesPayload, IConstructorState, ILoadInteractionsPayload, ILoadMetaPayload, ILoadConstructorPayload, } from '@/interfaces/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IConstructorState = {
    isLoading: false,
    interactions: [],
    scenes: [],
    meta: {
        totalInteractions: 0,
        totalQuestions: 0,
        totalScenes: 0,
    },
};

export const constructorSlice = createSlice({
    name: 'const',
    initialState,
    reducers: {
        startLoading: (state) => ({
            ...state,
            isLoading: true,
        }),
        abortLoading: (state) => ({
            ...state,
            isLoading: false,
        }),
        loadScenes: (state, action: PayloadAction<ILoadScenesPayload>) => ({
            ...state,
            scenes: action.payload.data,
        }),
        loadInteractions: (state, action: PayloadAction<ILoadInteractionsPayload>) => ({
            ...state,
            interactions: action.payload.data,
        }),
        loadMeta: (state, action: PayloadAction<ILoadMetaPayload>) => ({
            ...state,
            meta: action.payload.data,
        }),
        loadConstructor: (state, { payload, }: PayloadAction<ILoadConstructorPayload>) => ({
            ...state,
            isLoading: false,
            interactions: payload.interactions,
            scenes: payload.scenes,
            meta: payload.meta,
        }),
    },
});

export const {
    loadMeta,
    loadScenes,
    startLoading,
    abortLoading,
    loadConstructor,
    loadInteractions,
} = constructorSlice.actions;
export default constructorSlice.reducer;
