import { Camera } from 'lucide-react'



const WebCam = () => {


    return (
        <div className='w-full bg-gray-300 rounded-lg h-[24rem] flex flex-col justify-center items-center ' >

            <Camera className='w-24 h-24 text-gray-600 ' />
            <span className="text-xl">Enable Camera</span>

        </div>
    )
}

export default WebCam