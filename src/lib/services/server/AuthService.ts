import { NextResponse } from "next/server";

class AuthService {
    static baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    static authLogIn(
        accessToken: string | null,
        refreshToken: string | null,
        expires: Date,
        redirectUrl: string,
    ) {
        const response = NextResponse.redirect(redirectUrl);
        if(accessToken && refreshToken) {
            AuthService.addTokenCookies(
                response,
                accessToken,
                refreshToken,
                expires
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
        expires: Date,
    ) {
        const auth = {
            accessToken,
            refreshToken,
            expires,
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
        const expires = parseInt(process.env.ACCESS_EXPIRES);
        if(!refreshData || refreshData.statusCode == 401) {
            const response = NextResponse.json({
                state: false,
            });
            response.cookies.delete('authState');
            return response;
        };
        const response: NextResponse<any> = await fn(refreshData.accessToken, refreshData.refreshToken);
        return AuthService.addTokenCookies(
            response,
            refreshData.accessToken,
            refreshData.refreshToken,
            new Date(new Date().getTime()+expires),
        );
    };

    static async getMe(
        accessToken: string,
        refreshToken: string,
        expires: Date,
    ): Promise<any> {
        if(expires.getTime() <= new Date().getTime()) {
            console.log('tested');
            const refreshData = await AuthService.refreshTokens(refreshToken);
            console.log({refreshData});
            const newExpires = new Date(new Date().getTime()+parseInt(process.env.ACCESS_EXPIRES));
            const response = await AuthService.getMe(
                refreshData.accessToken,
                refreshData.refreshToken,
                newExpires
            );
            return AuthService.addTokenCookies(
                response,
                refreshData.accessToken,
                refreshData.refreshToken,
                newExpires
            );
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                }
            }
        );
        const data = await res.json();
        console.log({data});
        return NextResponse.json({
            state: true,
            accessToken,
            expires,
            refreshToken,
            name: data.fullName,
            id: data.id,
            avatarUrl: data.avatar?.id,
        });
    };
};

export default AuthService;
