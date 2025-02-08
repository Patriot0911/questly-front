'use client';

import { useIsAuthorized } from "@/hooks/redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LoginDialog from "../LoginDialog";
import ProfileButton from "../ProfileButton";

const Header = () => {
    const isAuthorized = useIsAuthorized();
    
    useEffect(
        () => {
            const cb = async () => {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include',
                });
                const data = await res.json();
                console.log({ data });
            };
            cb();
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