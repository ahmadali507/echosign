import { Button } from "@/components/ui/button"
import { useStateContext } from "@/context/useStateContext"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

const Mimick = () => {

    const { setOutputGesture } = useStateContext();
    const {setDetectedText} = useStateContext()
;     const { capturedImage } = useStateContext()

    const onExport = async () => {

        if (!capturedImage) return toast.error('No image captured')

        // Create FormData object
        const blob = await fetch(capturedImage).then((res) => res.blob());

        // Create File object from Blob
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

        // Create FormData object
        const formData = new FormData();
        formData.append("image", file);

        const requestUrl = "http://127.0.0.1:8000/detect";

        try {
            const response = await axios.post(requestUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setOutputGesture(response.data.gesture);
            setDetectedText(response.data.gesture); 

        } catch (error) {
            console.error('Error detecting gesture:', error);
            setOutputGesture("NO such gesture is registered for detection uptill now.")
            setDetectedText("NO such gesture is registered for detection uptill now.")
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