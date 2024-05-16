import React, { createContext, useContext, ReactNode, useState } from 'react';

interface StateContextType {
    capturedImage: string,
    setCapturedImage: any,
    detectedText : string, 
    setDetectedText : any,
    outputGesture: string, // Define outputGesture in the interface
    setOutputGesture: React.Dispatch<React.SetStateAction<string>> // Define setOutputGesture in the interface
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [capturedImage, setCapturedImage] = useState('');
    const [outputGesture, setOutputGesture] = useState(''); 
    const [detectedText, setDetectedText] = useState(''); // Initialize outputGesture state

    return (
        <StateContext.Provider
            value={{
                detectedText, 
                setDetectedText, 
                capturedImage,
                setCapturedImage,
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
