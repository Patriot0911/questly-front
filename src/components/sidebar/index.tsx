import Image from "next/image";
import LoginDialog from "../login-dialog";

const Sidebar = () => {
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