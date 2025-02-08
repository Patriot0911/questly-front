import type { AppDispatch, AppStore, RootState } from '@/lib/redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useIsAuthorized = () => {
    return useAppSelector(state => state.auth.isAuthenticated);
};

export const useUserInfo = () => {
    return useAppSelector(state => ({
        userName: state.auth.userName,
        avatarUrl: state.auth.avatarUrl,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
    }));
};
