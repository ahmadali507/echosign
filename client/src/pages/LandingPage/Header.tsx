import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Tooltip } from '@mui/material'

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className='ml-8 mt-14 text-center h-[30rem] flex flex-col justify-center itmes-center mb-40 '>
            <h1 className="pb-3 text-7xl text-foreground font-bold mb-8">Amplifying Voice, <br />Embracing Power of Signs</h1>
            <p className=" text-gray-700 text-lg ">Our mission is to promote sign language as a means of communication accessible to everyone, fostering a world where diversity is celebrated and communication barriers are minimized. We believe in the power of sign language to bridge communication gaps and promote inclusivity.</p>
            <div className="relative flex justify-center gap-2 w-full ">
                <Button onClick={() => navigate('/dashboard')} size='lg' className="text-lg py-7 px-8 mt-8" >Give it a try</Button>
                <Button onClick={() => navigate('/about')} variant='outline' size='lg' className="text-lg py-7 px-8 mt-8" >Learn more</Button>
                <Tooltip title='Chat' placement='top' >
                    <Button onClick={() => navigate('/chat')} className='fixed bottom-4 right-4 rounded-full w-12 h-12 flex justify-center items-center '>
                        <MessageCircle className='w-6 h-6' />
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Header