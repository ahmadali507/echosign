import { Button } from "@/components/ui/button"
import { useStateContext } from "@/context/useStateContext"
import axios from "axios"
import toast from "react-hot-toast"

const Mimick = () => {

    const { capturedImage } = useStateContext()

    const onExport = async () => {

        if (!capturedImage) return toast.error('No image captured')

        const requestUrl = "http://127.0.0.1:8000/detect";

        try {
            const response = await axios.post(requestUrl, capturedImage, {
                headers: {
                    'Content-Type': 'image/jpeg'
                }
            });
            console.log('Gesture detected:', response.data);
        } catch (error) {
            console.error('Error detecting gesture:', error);
        }
    }

    return (
        <div className='w-full h-full rounded-lg flex flex-col gap-1 ' >

            <h2 className='text-xl font-medium ' >Captured</h2>

            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden ">
                {
                    capturedImage
                        ?
                        <img src={capturedImage} alt='' className='w-full h-full object-cover ' />
                        :
                        <div className="text-center flex justify-center items-center w-full h-full ">
                            Captured image will be shown here
                        </div>
                }
            </div>

            <Button onClick={onExport} disabled={!capturedImage} >Send</Button>

        </div>
    )
}

export default Mimick