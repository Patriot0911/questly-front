import Header from '@/components/Header';
import { PropsWithChildren, } from 'react';

const FullLayout = ({ children, }: PropsWithChildren) => {
    return (
        <div className='w-full min-h-dvh flex flex-col relative'>
            <Header />
            <div
                className={'bg-[#A4ACFF] flex-grow flex flex-col'}
            >
                {children}
            </div>
        </div>
    );
};

export default FullLayout;
