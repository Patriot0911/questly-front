"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Difficulty } from "@/interfaces/quest"
import { useFetchWithAuth } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { CirclePlus } from "lucide-react"
import { Label } from "../ui/label"
import { useState } from "react"

const NewQuestDialog = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const fetchWithAuth = useFetchWithAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [previewImage, setPreviewImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting quest:", { title, description, difficulty, previewImage });
        const body = {
            title,
            description,
            difficulty,
        };

        if(previewImage) {
            const formData = new FormData();
            formData.append('file', previewImage);
            const fileRes = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
                method: 'POST',
                body: formData,
            });
            if(fileRes) {
                const fileData = await fileRes.json();
                Object.assign(body, {
                    thumbnail: fileData,
                });
            };
        };
        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            if(!res)
                return;
            const data = await res.json();
            if(!data.id)
                return;
            router.push(`constructor/${data.id}`);
            setTitle("");
            setDescription("");
            setDifficulty(Difficulty.EASY);
            setPreviewImage(null);
            setIsOpen(false);
            setIsOpen(false);
        } catch(e) {
            console.log({e});
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className="flex items-center space-x-2 text-sm px-2 py-1.5 cursor-default w-[134px] rounded-sm hover:bg-gray-100 hover:text-black">
                    <CirclePlus size={16} />
                    <span>Create Quest</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#3b3c3d] text-white border border-[#415bcf]">
                <DialogHeader>
                    <DialogTitle>Create New Quest</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 text-white border-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 text-white border-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)} required>
                            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-white border-gray-600">
                                <SelectItem value="EASY">Easy</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HARD">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="previewImage">Preview Image</Label>
                        <Input
                            id="previewImage"
                            type="file"
                            onChange={(e) => setPreviewImage(e.target.files?.[0] || null)}
                            className="bg-gray-700 text-white border-gray-600"
                            accept="image/*"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#415bcf] hover:bg-[#3a51b9] text-white">
                        Create Quest
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewQuestDialog;