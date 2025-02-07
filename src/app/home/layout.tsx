import Sidebar from '@/components/sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='grid grid-cols-6 h-screen'>
            <div className='col-span-1 border-r'>
                <Sidebar />
            </div>
            <div className='col-span-5 bg-[#5602F0]'>
                {children}
            </div>
        </div>
    );
};

export default Layout;