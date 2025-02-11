import ProfileContent from "@/components/profile/ProfileContent";

const ProfilePage = ({ params }: { params: { id: string } }) => {
    return <ProfileContent userId={params.id} />
};

export default ProfilePage;