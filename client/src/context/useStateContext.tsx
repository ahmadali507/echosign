import React, { createContext, useContext, ReactNode, useState } from 'react';

interface StateContextType {
    capturedImage: string,
    setCapturedImage: any
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [capturedImage, setCapturedImage] = useState('')

    return (
        <StateContext.Provider
            value={{
                capturedImage, setCapturedImage
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): StateContextType => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};
