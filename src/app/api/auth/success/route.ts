import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams, } = request.nextUrl;
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const response = NextResponse.redirect(process.env.HOME_REDIRECT!);
    if(accessToken && refreshToken) {
        const auth = {
            accessToken,
            refreshToken,
        };
        response.cookies.set('authState', JSON.stringify(auth));
    };
    return response;
};
