import { Button } from '@/components/ui/button'
import { RootState } from '@/store/store'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Authenticated = ({ children }: { children: ReactNode }) => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const { loggedUser, isLoading } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    if (isLoading && !loggedUser) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1 className='text-3xl font-semibold' >Loading...</h1>
            </div>
        )
    }
    else if (loggedUser) {
        return children
    }
    else {
        return (
            <div className="w-full py-60 flex flex-col justify-center items-center gap-4 ">
                <h1 className='text-3xl font-medium ' >You are not logged in</h1>
                <div className="flex justify-center items-center gap-4">
                    <Button variant='outline' onClick={() => navigate('/')}>Go Back</Button>
                    <Button variant='default' onClick={() => navigate('/login')} >Login</Button>
                </div>
            </div>
        )
    }

}

export default Authenticated