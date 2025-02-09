import QuestGallery from "@/components/quest/QuestGallery";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/quests/list/gallery`;

const HomePage = () => {
    return (
        <div className="p-4">
            <QuestGallery baseUrl={baseUrl} />
        </div>
    );
};

export default HomePage;