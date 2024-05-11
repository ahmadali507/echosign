import { Logo } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    return (
       
        <div className="flex justify-between items-center px-16 py-4 h-[4rem] bg-white w-full ">

            <img src={Logo} alt="Image" className="w-12 z-10" />

            <div className='flex justify-start gap-4' >
                <Button variant='default' onClick={() => navigate('/register')}  >
                    Sign in
                </Button>
                <Button variant='default' onClick={() => navigate('/login')}  >
                    Login
                </Button>
            </div>
        </div>
        


    )
}

export default Navbar