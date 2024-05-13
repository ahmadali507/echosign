import { Logo } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Cookies from 'js-cookie'
import { resetAuthState } from '@/store/reducers/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onLogout = () => {
        navigate('/')
        Cookies.remove('echo.token')
        dispatch(resetAuthState())
        toast.success('Logout successfully.')
    }


    return (
        <div className="flex justify-between items-center h-[6rem] w-full ">

            <Link to='/' ><img src={Logo} alt="Image" className="w-36 z-10" /></Link>

            {
                user
                    ?
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='px-2 py-0.5 '   >
                                <div className='flex justify-end items-center gap-2 ' >
                                    <span className='text-xl font-medium text-muted-foreground ' >{user?.username}</span>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl} className='object-cover' />
                                        <AvatarFallback className='capitalize' >{user?.username?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/profile')} >Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={onLogout} >Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </>
                    :
                    <div className='flex justify-start gap-4' >
                        <Button variant='outline' size='lg' onClick={() => navigate('/register')}  >
                            Register
                        </Button>
                        <Button variant='default' size='lg' onClick={() => navigate('/login')}  >
                            Login
                        </Button>
                    </div>
            }
        </div>



    )
}

export default Navbar