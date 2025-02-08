import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const authRaw = request.cookies.get('authState');
    if(!authRaw)
        return NextResponse.json({
            state: false,
        });
    const authState = JSON.parse(authRaw.value);
    const { accessToken, refreshToken, } = authState;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
            headers: {
                'authorization': `Bearer ${accessToken}`,
            }
        }
    );
    const { fullName, } = await res.json();
    return NextResponse.json({
        state: true,
        accessToken,
        refreshToken,
        name: fullName,
    });
};
