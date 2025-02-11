import { ILoadScenesPayload, IConstructorState, ILoadInteractionsPayload, ILoadMetaPayload, ILoadConstructorPayload, ISelectScenePayload, } from '@/interfaces/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IConstructorState = {
    isLoading: false,
    interactions: [],
    scenes: [],
    current: {
        createInteraction: false,
        interaction: undefined,
        scene: undefined,
    },
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
        selectScene: (state, action: PayloadAction<ISelectScenePayload>) => ({
            ...state,
            current: {
                ...state.current,
                scene: action.payload,
            },
        }),
        selectInteraction: (state, action: PayloadAction<ISelectScenePayload>) => ({
            ...state,
            current: {
                ...state.current,
                scene: action.payload,
            },
        }),
        switchCreateState: (state) => ({
            ...state,
            current: {
                ...state.current,
                createInteraction: !state.current.createInteraction,
            },
        }),
    },
});

export const {
    loadMeta,
    loadScenes,
    selectScene,
    startLoading,
    abortLoading,
    loadConstructor,
    loadInteractions,
    selectInteraction,
    switchCreateState,
} = constructorSlice.actions;
export default constructorSlice.reducer;
