import { PropsWithChildren, } from 'react';
import Header from '@/components/Header';

const FullLayout = ({ children, }: PropsWithChildren) => {
    return (
        <div className='w-full min-h-dvh flex flex-col relative'>
            <Header />
            <div
                className={'bg-[#4751c0] flex-grow flex flex-col'}
            >
                {children}
            </div>
        </div>
    );
};

export default FullLayout;
