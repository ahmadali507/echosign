/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Message } from '@/interfaces'

interface StateContextType {
    capturedImage: string,
    setCapturedImage: any,
    detectedText: string,
    isConnectedToSocket: boolean, setIsConnectedToSocket: any,
    arrivalMessage: Message | null, setArrivalMessage: any
    setDetectedText: any,
    liveUsers: { userId: string, socketId: string, email: string }[], setLiveUsers: any,
    outputGesture: string, // Define outputGesture in the interface
    setOutputGesture: React.Dispatch<React.SetStateAction<string>> // Define setOutputGesture in the interface
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [capturedImage, setCapturedImage] = useState('');
    const [outputGesture, setOutputGesture] = useState('');
    const [detectedText, setDetectedText] = useState(''); // Initialize outputGesture state
    const [isConnectedToSocket, setIsConnectedToSocket] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
    const [liveUsers, setLiveUsers] = useState<{ userId: string, socketId: string, email: string }[]>([]);


    return (
        <StateContext.Provider
            value={{
                detectedText,
                setDetectedText,
                isConnectedToSocket, setIsConnectedToSocket,
                capturedImage,
                setCapturedImage,
                arrivalMessage, setArrivalMessage,
                liveUsers,
                setLiveUsers,
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