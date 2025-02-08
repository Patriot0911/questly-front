import Sidebar from '@/components/sidebar';
import { PropsWithChildren, } from 'react';

const FullLayout = ({ children, }: PropsWithChildren) => {
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

export default FullLayout;
