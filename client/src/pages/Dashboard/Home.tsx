import { useNavigate } from 'react-router-dom'

const Home = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    return (
        <div className='bg-gradient-to-b from-green-300 to-blue-500 flex justify-center items-center h-screen' >
            <div className="fixed top-0 left-0 w-full h-14 bg-white border border-black z-10"></div>
            <img src="src/EchoSign.ico" alt="Image" className="fixed top-1 left-1 w-36 h-11 z-10" />
            <button onClick={() => navigate('/register')} className="fixed top-2 right-1 py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-900  text-white z-10">
                Sign in
            </button>
            <button onClick={() => navigate('/login')} className="fixed top-2 right-20 py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-900  text-white z-10">
                Login
            </button>
            <button onClick={() => navigate('terms-and-conditions')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                TandC
            </button>
            <button onClick={() => navigate('/change-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Change Password
            </button>
            <button onClick={() => navigate('/reset-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Reset Password
            </button>
            <button onClick={() => navigate('/forget-password')} className="py-3 px-4 rounded-md bg-black hover:bg-black/80 text-white">
                Forgot Password
            </button>
        </div>

    )
}

export default Home