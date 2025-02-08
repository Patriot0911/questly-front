import { redirect } from "next/navigation";

const NotFoundPage = () => {
    redirect("/home");
};

export default NotFoundPage;
