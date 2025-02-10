'use client';

import { useAppDispatch, useAppSelector, } from "@/hooks/redux";
import { useIsAuthorizedSelector } from "@/hooks/redux/auth";
import { logIn } from "@/lib/redux/slices/auth";
import { useEffect } from "react";
import LoginDialog from "../LoginDialog";
import ProfileButton from "../ProfileButton";

import NavBar from "./NavBar";

const Header = () => {
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(useIsAuthorizedSelector);
    useEffect(
        () => {
            (async () => {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include',
                });
                const { state, ...data } = await res.json();
                if(!state)
                    return;
                const { name: userName, accessToken, refreshToken, } = data;
                if(!state)
                    return
                dispatch(logIn({ userName, accessToken, refreshToken }));
            })();
        }, []
    );
    return (
        <header
            className={`bg-[#4d4f50] w-full flex items-center justify-between h-16 p-4 gap-4 sticky top-0 z-30`}
            style={{ boxShadow: '0px 0px 5px 2px #383838'}}
        >
            <NavBar isAuth={isAuthorized} />
            {isAuthorized ? (
                <ProfileButton />
            ) : (
                <LoginDialog />
            )}
        </header>
    );
};

export default Header;