'use client';
import ProfileContent from "@/components/profile/ProfileContent";
import { useParams } from "next/navigation";

const ProfilePage = () => {
    const { id } = useParams();
    return <ProfileContent userId={id as string} />
};

export default ProfilePage;