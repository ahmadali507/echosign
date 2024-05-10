import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div className="flex overflow-hidden">

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Navbar />
                <main>
                    <div className="mx-auto max-w-screen-2xl relative">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
