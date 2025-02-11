import { NextRequest, NextResponse, } from 'next/server';
import AuthService from '@/lib/services/server/AuthService';

export async function GET(request: NextRequest) {
    const authRaw = request.cookies.get('authState');
    if(!authRaw)
        return NextResponse.json({
            state: false,
        });
    const authState = JSON.parse(authRaw.value);
    const { accessToken, } = authState;
    if(accessToken) {
        AuthService.authLogOut(accessToken);
    };
    const response = NextResponse.json({
        state: !!accessToken,
    });
    response.cookies.delete('authState');
    return response;
};
