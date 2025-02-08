import StoreProvider from '@/components/StoreProvider';
import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'QuestLy | 👀',
    description: 'Would you be able to get out?',
};

const RootLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <html lang='en'>
            <body className={`antialiased`}>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;
