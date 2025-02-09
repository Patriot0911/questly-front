import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector, } from "@/hooks/redux";
import { useUserSelector } from "@/hooks/redux/auth";
import { authLogOut, } from '@/lib/redux/slices/auth';
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
    const disaptch = useAppDispatch();
    // const avatarUrl = '';
    // const userName = '';
    const { avatarUrl, userName, accessToken, } = useAppSelector(useUserSelector);
    const logOut = async () => {
        const res = await fetch('/api/auth/logout');
        const data = await res.json();
        if(data.state) {
            disaptch(authLogOut());
        };
    };
    const createNewQuest = async () => {
        // if(!accessToken)
        //     return;
        // try {
        //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests`, {
        //         method: 'POST',
        //         headers: {
        //             'authorization': `Bearer ${accessToken}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "title": "2qwe",
        //             "description": "string",
        //             "difficulty": "MEDIUM"
        //         })
        //     })
        //     const data = await res.json();
        // } catch(e) {
        //     console.log({e});
        // }
    };
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center space-x-4 focus:outline-none">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt={userName} />
                    <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-white">{userName}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User size={16} />
                        <span>My Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={logOut}>
                    <div>
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={createNewQuest}>
                    <span>Create Quest</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
