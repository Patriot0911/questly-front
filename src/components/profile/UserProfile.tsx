"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IUser } from "@/interfaces/user";
import { useState } from "react";

interface UserProfileProps {
    user: IUser;
    isCurrentUser: boolean;
};

const UserProfile = ({ user, isCurrentUser }: UserProfileProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)

    const handleSave = () => {
        console.log("Saving:", { username, avatarUrl }) //mock
        setIsEditing(false)
    }

    return (
        <Card
            className="bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
            style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
        >
            <CardContent className="p-6 flex flex-col items-center">
                <Avatar className="w-48 h-48 mb-6">
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-center mb-4">
                    {isEditing ? (
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-700 text-white border-gray-600 mb-2"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold mb-2">{username}</h2>
                    )}
                    <div className="text-gray-300">
                        <p>Created Quests: {user.createdQuestsCount}</p>
                        <p>Passed Quests: {user.passedQuestsCount}</p>
                    </div>
                </div>
                {isCurrentUser && (
                    <div className="w-full">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button onClick={handleSave} className="flex-1 bg-[#415bcf] hover:bg-[#3a51b9]">
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    variant="outline"
                                    className="flex-1 text-black hover:bg-gray-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} className="w-full bg-[#415bcf] hover:bg-[#3a51b9]">
                                Edit Profile
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
};

export default UserProfile;