'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IQuestComment } from "@/interfaces/quest";
import { useState } from "react";

interface QuestCommentsProps {
  questId: string;
};

const mockComments: IQuestComment[] = [
  {
    id: "1",
    authorId: "user1",
    authorName: "Alice Johnson",
    authorAvatar: "/placeholder.svg",
    content: "Great quest! I really enjoyed the challenges.",
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    authorId: "user2",
    authorName: "Bob Smith",
    authorAvatar: "/placeholder.svg",
    content: "The difficulty was just right. Looking forward to more quests like this!",
    createdAt: "2023-06-16T14:45:00Z",
  },
];

const QuestComments = ({ questId }: QuestCommentsProps) => {
  const [comments, setComments] = useState<IQuestComment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: IQuestComment = {
        id: Date.now().toString(),
        authorId: "currentUser", // Replace with actual user ID
        authorName: "Current User", // Replace with actual user name
        authorAvatar: "/placeholder.svg", // Replace with actual user avatar
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  };

  return (
    <Card
      className="mt-8 bg-[#3b3c3d] text-white border border-[#415bcf] rounded-none"
      style={{ boxShadow: '-1px 1px 4px 3px rgba(0, 0, 0, 0.384)' }}
    >
      <CardHeader>
        <CardTitle className="text-xl">Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          <Button onClick={handleSubmitComment} className="mt-2 bg-[#415bcf] hover:bg-[#3a51b9] text-white">
            Post Comment
          </Button>
        </div>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                <AvatarFallback>{comment.authorName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold">{comment.authorName}</h4>
                  <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-1 text-gray-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
};

export default QuestComments;

