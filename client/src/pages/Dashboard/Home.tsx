import { useNavigate } from 'react-router-dom'

const Home = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    return (
        <div className="absolute top-0 w-full bg-gradient-to-b from-blue-500 to-white">
        <div className="fixed top-0 left-0 w-full h-14 bg-white border border-black z-10"></div>
        <img
          src="src/EchoSign.ico"
          alt="Image"
          className="fixed top-1 left-1 w-36 h-11 z-10"
        />
        <div>
            <div className='ml-8 mt-20 text-7xl text-green-300 font-bold text-center'>
            <h1 className="pb-3">Amplifying Voice,</h1>
            <h1>Embracing Power of Signs</h1></div>
        </div>
        {/*
        <div className="flex justify-center mt-20">
            <div className="max-w-sm border border-black bg-green-300 hover:bg-green-400 rounded-lg p-6 transition duration-300 transform hover:scale-105">
                <h1 className="text-center text-white text-3xl font-bold mb-4">Vision</h1>
                <p className="text-center text-white text-lg">
            Our vision at EchoSign is to empower seamless communication by bridging spoken language with sign language. We strive to celebrate diversity, amplify silent voices, and foster inclusive connections that transcend linguistic barriers, enabling everyone to express themselves freely and be understood.
                </p>
            </div>
        </div>
    */}
        <div className="flex justify-center mt-32">
            <div className="max-w-sm border border-black bg-green-300 hover:bg-green-400 rounded-lg p-6 transition duration-300 transform hover:scale-105">
                <h1 className="text-center text-white text-3xl font-bold mb-4">Mision</h1>
                <p className="text-center text-white text-lg">
                At EchoSign, we're on a mission to bridge communication gaps, empower inclusion, and ensure everyone's voice is heard.
                </p>
            </div>
        </div>

        <div>
            <button onClick={() => navigate('/register')} className="fixed top-2 right-1 py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-900  text-white z-10">
                Sign in
            </button>
            <button onClick={() => navigate('/login')} className="fixed top-2 right-20 py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-900  text-white z-10">
                Login
            </button>
            
            <button onClick={() => navigate('terms-and-conditions')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                TandC
            </button>
            {/*
            <button onClick={() => navigate('/change-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Change Password
            </button>
            <button onClick={() => navigate('/reset-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Reset Password
            </button>
            <button onClick={() => navigate('/forget-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Forgot Password
            </button>
            */}
        </div>
        </div>


    )
}

export default Home