import { Logo } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Navbar = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center h-[5rem] bg-white w-full ">

            <Link to='/' ><img src={Logo} alt="Image" className="w-36 z-10" /></Link>

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