import { Camera } from 'lucide-react'
import { useState } from 'react'
import Webcam from 'react-webcam'


const WebCamComponent = () => {

    const [enableCamera, setEnableCamera] = useState(false)



    return (
        <div onClick={() => setEnableCamera(true)} className='w-full bg-gray-300 rounded-lg h-[24rem] flex flex-col justify-center items-center ' >
            {
                enableCamera
                    ?
                    <Webcam className='w-full h-full ' />
                    :
                    <>
                        <Camera className='w-24 h-24 text-gray-600 ' />
                        <span className="text-xl">Enable Camera</span>
                    </>
            }

        </div>
    )
}

export default WebCamComponent