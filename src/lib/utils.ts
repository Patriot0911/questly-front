'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import AuthService from './services/client/AuthService';
import { useUserSelector } from '@/hooks/redux/auth';
import { authLogOut, authRefreshToken, logIn } from './redux/slices/auth';
import { clsx, type ClassValue, } from 'clsx';
import { twMerge, } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
};

export const getImageSize = async (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const useFetchWithAuth = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, accessToken, refreshToken, tokenExpires, isLoading, } = useAppSelector(useUserSelector);
    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        // console.log({isAuthenticated});
        // console.log({accessToken});
        // console.log({refreshToken});
        // console.log({isLoading});
        if(!isAuthenticated || !accessToken  || !refreshToken || isLoading)
            return;
        if(!tokenExpires || tokenExpires?.getTime() < new Date().getTime()) {
            const refreshData = await AuthService.refreshToken();
            if(!refreshData || !refreshData.state) {
                dispatch(authLogOut());
                return;
            };
            dispatch(
                authRefreshToken({
                    accessToken: refreshData.accessToken,
                    refreshToken: refreshData.refreshToken,
                    tokenExpires: refreshData.tokenExpires,
                })
            );
            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${refreshData.accessToken}`,
                },
            });
        };
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
    return fetchWithAuth;
};
