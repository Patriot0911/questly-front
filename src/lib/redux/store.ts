import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/auth';
import constructorReducer from './slices/constructor';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            construction: constructorReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
