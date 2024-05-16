/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from '@/interfaces';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface StateContextType {
    capturedImage: string,
    setCapturedImage: any,
    selectedChat: Chat, setSelectedChat: any,
    outputGesture: string, // Define outputGesture in the interface
    setOutputGesture: React.Dispatch<React.SetStateAction<string>> // Define setOutputGesture in the interface
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [capturedImage, setCapturedImage] = useState('');
    const [outputGesture, setOutputGesture] = useState(''); // Initialize outputGesture state

    const [selectedChat, setSelectedChat] = useState<Chat>(null);

    return (
        <StateContext.Provider
            value={{
                capturedImage,
                setCapturedImage,
                selectedChat, setSelectedChat,
                outputGesture, // Provide outputGesture in the context value
                setOutputGesture // Provide setOutputGesture in the context value
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