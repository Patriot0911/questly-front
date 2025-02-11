export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string;
            HOME_REDIRECT: string;
            ACCESS_EXPIRES: string;
        };
    };
};