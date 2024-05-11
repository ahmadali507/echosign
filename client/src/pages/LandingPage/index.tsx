import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full bg-white">

            <div>
                <div className='ml-8 mt-20 text-center'>
                    <h1 className="pb-3 text-7xl text-blue-500 font-bold ">Amplifying Voice, <br />Embracing Power of Signs</h1>
                    <p className="text-gray-700 text-lg ">Our mission is to promote sign language as a means of communication accessible to everyone, fostering a world where diversity is celebrated and communication barriers are minimized. We believe in the power of sign language to bridge communication gaps and promote inclusivity.</p>
                    <Button onClick={() => navigate('/dashboard')} size='lg' className="text-lg py-7 px-8 mt-4" >Give it a try</Button>
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <div className="max-w-sm border border-black bg-green-300 hover:bg-green-400 rounded-lg p-6 transition duration-300 transform hover:scale-105">
                    <h1 className="text-center text-white text-3xl font-bold mb-4 underline">Vision</h1>
                    <p className="text-center text-white text-lg">
                        Our vision at EchoSign is to empower seamless communication by bridging spoken language with sign language. We strive to celebrate diversity, amplify silent voices, and foster inclusive connections that transcend linguistic barriers, enabling everyone to express themselves freely and be understood.
                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <div className="max-w-sm border border-black bg-green-300 hover:bg-green-400 rounded-lg p-6 transition duration-300 transform hover:scale-105">
                    <h1 className="text-center text-white text-3xl font-bold mb-4 underline">Mission</h1>
                    <p className="text-center text-white text-lg">
                        At EchoSign, we're on a mission to bridge communication gaps, empower inclusion, and ensure everyone's voice is heard.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default LandingPage