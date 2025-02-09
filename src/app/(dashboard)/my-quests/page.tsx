import QuestGallery from "@/components/quest/QuestGallery";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/quests/list/authored`;

const MyQuestsPage = () => {
    return (
        <div className="p-4">
            <QuestGallery isAuth baseUrl={baseUrl} />
        </div>
    );
};

export default MyQuestsPage;