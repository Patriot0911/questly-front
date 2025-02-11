"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Difficulty } from "@/interfaces/quest"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
import { Label } from "../ui/label"

const NewQuestDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [previewImage, setPreviewImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting quest:", { title, description, difficulty, previewImage });

        setTitle("");
        setDescription("");
        setDifficulty(Difficulty.EASY);
        setPreviewImage(null);
        setIsOpen(false);
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