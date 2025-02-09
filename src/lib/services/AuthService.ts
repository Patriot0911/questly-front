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
            AuthService.addTokenCookies(
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
            `${AuthService.baseUrl}/logout`,
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
        return response;
    };

    static async refreshTokens(refreshToken: string): Promise<any> {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${refreshToken}`,
                },
            }
        );
        const data = await res.json();
        return data;
    };

    static async refreshWare(refreshToken: string, fn: (accessToken: string, refreshToken: string) => Promise<NextResponse<any>>) {
        const refreshData = await AuthService.refreshTokens(refreshToken);
        if(!refreshData || refreshData.statusCode == 401) {
            const response = NextResponse.json({
                state: false,
            });
            response.cookies.delete('authState');
            return response;
        };
        const response: NextResponse<any> = await fn(refreshData.accessToken, refreshData.refreshToken);
        return AuthService.addTokenCookies(response, refreshData.accessToken, refreshData.refreshToken);
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
        if(res.status == 401) {
            return AuthService.refreshWare(refreshToken, AuthService.getMe);
        };
        const data = await res.json();
        return NextResponse.json({
            state: true,
            accessToken,
            refreshToken,
            name: data.fullName,
        });
    };
};

export default AuthService;
