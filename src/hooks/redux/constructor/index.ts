import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";

export const useConstructorSelector = createSelector(
    (state: RootState) => state,
    (state) => state.construction,
);

export const useConstructorInteractionsSelector = createSelector(
    (state: RootState) => state,
    (state) => state.construction.interactions,
);

export const useConstructorSceneStateSelector = createSelector(
    (state: RootState) => state,
    (state) => state.construction.current.scene,
)

export const useConstructorScenesSelector = createSelector(
    (state: RootState) => state,
    (state) => state.construction.scenes,
);

export const useConstructorMetaSelector = createSelector(
    (state: RootState) => state,
    (state) => state.construction.meta,
);
