'use client';

import { useAppDispatch, useIsAuthorized } from "@/hooks/redux";
import ProfileButton from "../ProfileButton";
import LoginDialog from "../LoginDialog";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { logIn } from "@/lib/redux/slices/auth";

const Header = () => {
    const dispatch = useAppDispatch();
    const isAuthorized = useIsAuthorized();
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
                dispatch(logIn({ userName, accessToken, refreshToken, }))
            })();
        }, []
    );
    return (
        <header
            className={`bg-[#4d4f50] w-full flex items-center justify-between h-16 p-4 gap-4 sticky top-0 z-30`}
            style={{ boxShadow: '0px 0px 5px 2px #383838'}}
        >
            <Link href="/home" className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                    src="/assets/images/logo.png"
                    alt="Vercel logomark"
                    width={52}
                    height={52}
                    priority
                />
            </Link>
            {isAuthorized ? (
                <ProfileButton />
            ) : (
                <LoginDialog />
            )}
        </header>
    );
};

export default Header;