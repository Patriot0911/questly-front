import FullLayout from '@/components/layouts/FullLayout';
import { PropsWithChildren, } from 'react';

const Layout = ({ children, }: PropsWithChildren) => {
    return (
        <FullLayout>
            {children}
        </FullLayout>
    );
};

export default Layout;