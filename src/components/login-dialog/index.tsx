'use client';
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useRouter } from "next/navigation";

const LoginDialog = () => {
    const { push, } = useRouter();
    const cbGoogle = (event: FormEvent) => {
        event.preventDefault();
        push(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/google`);
    };
    const cbGit = (event: FormEvent) => {
        event.preventDefault();
        push(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/github`);
    };
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
                <Button onClick={cbGoogle} type="submit" className="w-full">
                    Login with Google
                </Button>
                <Button onClick={cbGit} type="submit" className="w-full mt-3">
                    Login with Github
                </Button>
            </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;