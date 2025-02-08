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
                const { name, accessToken, refreshToken, state, } = await res.json();
                if(!state)
                    return;
                dispatch(logIn({
                    userName: name,
                    accessToken,
                    refreshToken,
                }))
            })();
        }, []
    );
    return (
        <header className="bg-[#2B1555] w-full">
            <div className="flex items-center justify-between h-16 p-4 gap-4">
                <Link href="/home" className="flex items-center justify-center gap-2">
                    <Image
                        src="/vercel.svg"
                        alt="Vercel logomark"
                        width={32}
                        height={32}
                        priority
                    />
                    <p className="text-white">QuestLy</p>
                </Link>
                {isAuthorized ? (
                    <ProfileButton />
                ) : (
                    <LoginDialog />
                )}
            </div>
        </header>
    );
};

export default Header;