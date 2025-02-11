'use client';

import { useAppDispatch, useAppSelector, } from "@/hooks/redux";
import { logIn, notLogged, } from "@/lib/redux/slices/auth";
import { useUserSelector } from "@/hooks/redux/auth";
import ProfileButton from "../ProfileButton";
import LoginDialog from "../LoginDialog";
import { useEffect } from "react";

import NavBar from "./NavBar";

const Header = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, } = useAppSelector(useUserSelector);
    useEffect(
        () => {
            (async () => {
                try {
                    const res = await fetch('/api/auth/me', {
                        credentials: 'include',
                    });
                    const { state, ...data } = await res.json();
                    if(!state)
                        return dispatch(notLogged());
                    const { name: userName, accessToken, refreshToken, avatarUrl, id, expires, } = data;
                    dispatch(logIn({ userName, accessToken, refreshToken, id, avatarUrl, tokenExpires: expires, }))
                } catch(e: any) {
                    dispatch(notLogged());
                };
            })();
        }, []
    );
    return (
        <header
            className={`bg-[#4d4f50] w-full flex items-center justify-between h-16 p-4 gap-4 sticky top-0 z-30`}
            style={{ boxShadow: '0px 0px 5px 2px #383838'}}
        >
            <NavBar />
            {
                !isLoading && (
                    isAuthenticated ? (
                        <ProfileButton />
                    ) : (
                        <LoginDialog />
                    )
                )
            }
        </header>
    );
};

export default Header;