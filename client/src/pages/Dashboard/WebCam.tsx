import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useStateContext } from '@/context/useStateContext';
import { Camera, Scan, CameraOffIcon } from 'lucide-react';
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
                        <div className="absolute bottom-4 right-4 flex items-center">

                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant='outline'
                                        className='ml-1 bg-green-500 shadow-md border border-white hover:bg-green-600'
                                        onClick={() => {
                                            const imageSrc = getScreenshot();
                                            setCapturedImage(imageSrc);
                                        }}
                                    >
                                        <Scan />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Capture</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant='outline'
                                        className='ml-1 bg-red-400 shadow-md border border-white hover:bg-red-500'
                                        onClick={() => setEnableCamera(false)}
                                    >
                                        <CameraOffIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Disable</TooltipContent>
                            </Tooltip>
                        </div>


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
