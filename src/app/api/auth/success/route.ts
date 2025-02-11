import AuthService from '@/lib/services/server/AuthService';
import { NextRequest, } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams, } = request.nextUrl;
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const expires = parseInt(process.env.ACCESS_EXPIRES);
    const response = AuthService.authLogIn(
        accessToken,
        refreshToken,
        new Date(new Date().getTime()+expires),
        process.env.HOME_REDIRECT
    );
    return response;
};
