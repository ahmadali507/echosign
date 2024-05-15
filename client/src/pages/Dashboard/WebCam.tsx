import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useStateContext } from '@/context/useStateContext';
import { Camera, CameraIcon } from 'lucide-react';
import { useState } from 'react';
import Webcam from 'react-webcam';

const WebCamComponent = () => {
    const { setCapturedImage } = useStateContext();
    const [enableCamera, setEnableCamera] = useState(false);


    const captureImage = async (getScreenshot) => {
        const imageSrc = getScreenshot();
        setCapturedImage(imageSrc);
    };

    return (
        <div className='relative w-full bg-gray-300 rounded-lg h-[24rem] overflow-hidden'>
            {enableCamera ? (
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className='w-full h-full relative'
                    mirrored={true}
                >
                    {({ getScreenshot }) => (
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        const imageSrc = getScreenshot();
                                        setCapturedImage(imageSrc);
                                    }}
                                    className='absolute top-4 right-4'
                                >
                                    <CameraIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Capture</TooltipContent>
                        </Tooltip>
                    )}
                </Webcam>
            ) : (
                <div onClick={() => setEnableCamera(true)} className='cursor-pointer w-full h-full flex flex-col justify-center items-center'>
                    <Camera className='w-24 h-24 text-gray-600' />
                    <span className="text-xl">Enable Camera</span>
                </div>
            )}
        </div>
    );
};

export default WebCamComponent;
