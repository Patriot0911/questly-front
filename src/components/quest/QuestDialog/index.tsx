import { IQuestPreview } from "@/interfaces/quest";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../ui/dialog";
import QuestPreview from "../QuestPreview";

interface QuestDialogProps {
    quest: IQuestPreview;
};

const QuestDialog = ({ quest }: QuestDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger>
                <QuestPreview quest={quest} />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{quest.title}</DialogTitle>
                <p>{quest.description}</p>
            </DialogContent>
        </Dialog>
    );
};

export default QuestDialog;