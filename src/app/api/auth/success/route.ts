import AuthService from '@/lib/services/AuthService';
import { NextRequest, } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams, } = request.nextUrl;
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const response = AuthService.authLogIn(
        accessToken,
        refreshToken,
        process.env.HOME_REDIRECT
    );
    return response;
};
