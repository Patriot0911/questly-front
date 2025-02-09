import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/lib/services/AuthService';

export async function GET(request: NextRequest) {
    const authRaw = request.cookies.get('authState');
    if(!authRaw)
        return NextResponse.json({
            state: false,
        });
    const authState = JSON.parse(authRaw.value);
    const { accessToken, refreshToken, } = authState;
    return AuthService.getMe(accessToken, refreshToken);
};
