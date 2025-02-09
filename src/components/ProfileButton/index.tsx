import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector, useUserSelector } from "@/hooks/redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authLogOut, } from '@/lib/redux/slices/auth';
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
    const disaptch = useAppDispatch();
    const { avatarUrl, userName, } = useAppSelector(useUserSelector);
    const logOut = async() => {
        const res = await fetch('/api/auth/logout');
        const data = await res.json();
        console.log({data});
        if(data.state) {
            console.log('tested')
            disaptch(authLogOut());
        };
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
