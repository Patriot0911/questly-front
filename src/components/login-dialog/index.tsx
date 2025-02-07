import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

const LoginDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button>
                Login
            </Button>
            </DialogTrigger>
            <DialogContent>
            <div className="p-4 rounded-full">
                <DialogTitle className="text-center">Login</DialogTitle>
                <hr className="my-4 border-2" />
                <Button type="submit" className="w-full">
                    Login with Google
                </Button>
            </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;