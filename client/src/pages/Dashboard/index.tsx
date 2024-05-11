import Audio from "./Audio"
import Mimick from "./Mimick"
import TextBox from "./TextBox"
import WebCam from "./WebCam"

const Dashboard = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    return (
        <div className="w-full flex justify-center py-6 ">
            <div className="w-full flex flex-col gap-4 ">

                <WebCam />

                <div className="grid grid-cols-3 gap-4 ">
                    <div className="cols-span-1 min-h-[16rem] "><TextBox /></div>
                    <div className="cols-span-1 min-h-[16rem] "><Mimick /></div>
                    <div className="cols-span-1 min-h-[16rem] "><Audio /></div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard