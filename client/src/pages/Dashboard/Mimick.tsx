import { useStateContext } from "@/context/useStateContext"

const Mimick = () => {

    const { capturedImage } = useStateContext()

    return (
        <div className='w-full h-full rounded-lg flex flex-col gap-1 ' >

            <h2 className='text-xl font-medium ' >Mimick</h2>

            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden ">
                {
                    capturedImage
                    ?
                    <div className="text-center flex justify-center items-center w-full h-full ">
                        Captured image will be shown here
                    </div>
                    :
                    <img src={capturedImage} alt='' className='w-full h-full object-cover ' />
                }
            </div>

        </div>
    )
}

export default Mimick