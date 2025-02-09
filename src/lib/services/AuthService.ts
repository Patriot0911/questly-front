import { NextResponse } from "next/server";

class AuthService {
    static baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    static authLogIn(
        accessToken: string | null,
        refreshToken: string | null,
        redirectUrl: string,
    ) {
        const response = NextResponse.redirect(redirectUrl);
        if(accessToken && refreshToken) {
            this.addTokenCookies(
                response,
                accessToken,
                refreshToken
            );
        };
        return response;
    };

    static authLogOut(
        accessToken: string,
    ) {
        return fetch(
            `${this.baseUrl}/logout`,
            {
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                },
            },
        );
    };

    static addTokenCookies(
        response: NextResponse,
        accessToken: string,
        refreshToken: string,
    ) {
        const auth = {
            accessToken,
            refreshToken,
        };
        response.cookies.set('authState', JSON.stringify(auth));
    };

    static async refreshTokens(refreshToken: string) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${refreshToken}`,
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                })
            }
        );
        const data = await res.json();
        return data;
    };

    static async refreshWare(refreshToken: string, fn: (accessToken: string, refreshToken: string) => Promise<NextResponse<any>>) {
        console.log('refreshed');
        const refreshData = await this.refreshTokens(refreshToken);
        if(!refreshData)
            return NextResponse.json({
                state: false,
            });
        const response: NextResponse<any> = await fn(refreshData.accessToken, refreshData.refreshToken);
        this.addTokenCookies(response, refreshData.accessToken, refreshData.refreshToken);
        return response;
    };

    static async getMe(
        accessToken: string,
        refreshToken: string,
    ) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                }
            }
        );
        const data = await res.json();

        if(data.statusCode == 401) {
            return this.refreshWare(refreshToken, this.getMe);
        };
        return NextResponse.json({
            state: true,
            accessToken,
            refreshToken,
            name: data.fullName,
        });
    };
};

export default AuthService;
