'use client';

import Image from "next/image";
import LoginDialog from "../login-dialog";
import { useEffect } from "react";

const Sidebar = () => {
    useEffect(
        () => {
            const cb = async () => {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include',
                });
                const data = await res.json();
                console.log({data});
            };
            cb();
        }, []
    );
    return (
        <aside className="bg-[#2B1555] h-full">
            <div className="flex items-center justify-between h-16 p-4 gap-4">
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/vercel.svg"
                        alt="Vercel logomark"
                        width={32}
                        height={32}
                        priority
                    />
                    <p className="text-white">QuestLy</p>
                </div>
                <LoginDialog />
            </div>
        </aside>
    );
};

export default Sidebar;