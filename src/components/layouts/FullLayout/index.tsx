import Header from '@/components/Header';
import { PropsWithChildren, } from 'react';

const FullLayout = ({ children, }: PropsWithChildren) => {
    return (
        <div className='w-screen'>
            <div className='border-b'>
                <Header />
            </div>
            {/* затичка через жопу */}
            <div className='bg-[#5602F0] h-[calc(100vh-65px)]'>
                {children}
            </div>
        </div>
    );
};

export default FullLayout;
