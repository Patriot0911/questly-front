import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserInfo } from "@/hooks/redux";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
    const { userName, avatarUrl } = useUserInfo();
    return (
        <DropdownMenu>
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
                <DropdownMenuItem asChild>
                    <Link href="/logout">
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
