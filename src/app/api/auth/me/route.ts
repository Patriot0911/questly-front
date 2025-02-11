import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/lib/services/server/AuthService';

export async function GET(request: NextRequest) {
    const authRaw = request.cookies.get('authState');
    if(!authRaw)
        return NextResponse.json({
            state: false,
        });
    const authState = JSON.parse(authRaw.value);
    const { accessToken, refreshToken, expires, } = authState;
    return AuthService.getMe(accessToken, refreshToken, new Date(expires));
};
