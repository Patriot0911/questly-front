import AuthService from '@/lib/services/server/AuthService';
import { NextRequest, NextResponse, } from 'next/server';

export async function GET(request: NextRequest) {
    const authRaw = request.cookies.get('authState');
    if(!authRaw)
        return NextResponse.json({
            state: false,
        });
    const authState = JSON.parse(authRaw.value);
    const { refreshToken, } = authState;
    const expiresTime = parseInt(process.env.ACCESS_EXPIRES);
    try {
        const refreshData = await AuthService.refreshTokens(refreshToken);
        if(refreshData.statusCode == 401)
            return NextResponse.json({
                state: false,
            });
        const auth = {
            accessToken: refreshData.accessToken,
            refreshToken: refreshData.refreshToken,
            expires: new Date(new Date().getTime()+expiresTime),
        };
        const response = NextResponse.json({
            state: true,
            ...auth,
        });
        response.cookies.set('authState', JSON.stringify(auth));
        return response;
    } catch(e: any) {
        return NextResponse.json({
            state: false,
            message: e.message,
        });
    };
};
