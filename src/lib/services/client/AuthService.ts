class AuthService {
    static baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    static routes = {
        refresh: `/api/auth/refresh`,
    };

    static async refreshToken() {
        try {
            const res = await fetch(
                AuthService.routes.refresh, {
                method: "GET",
            });
            const data = await res.json();
            console.log({data});
            return {
                state: true,
                refreshToken: data.refreshToken,
                accessToken: data.accessToken,
                tokenExpires: data.expires,
            };
        } catch(e: any) {
            console.log(e);
            return {
                state: false,
            };
        };
    };
};

export default AuthService;
