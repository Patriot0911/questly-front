import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";

export const useIsAuthorizedSelector = createSelector(
    (state: RootState) => state,
    (state) => state.auth.isAuthenticated,
);

export const useUserSelector = createSelector(
    (state: RootState) => state,
    (state) => ({
        ...state.auth,
        tokenExpires: state.auth.tokenExpires && new Date(state.auth.tokenExpires),
    }),
);
