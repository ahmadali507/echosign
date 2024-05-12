import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className='ml-8 mt-20 text-center h-[30rem] flex flex-col justify-center itmes-center mb-40 '>
            <h1 className="pb-3 text-7xl text-foreground font-bold mb-8">Amplifying Voice, <br />Embracing Power of Signs</h1>
            <p className="text-gray-700 text-lg ">Our mission is to promote sign language as a means of communication accessible to everyone, fostering a world where diversity is celebrated and communication barriers are minimized. We believe in the power of sign language to bridge communication gaps and promote inclusivity.</p>
            <div className="flex justify-center gap-2 w-full ">
                <Button onClick={() => navigate('/dashboard')} size='lg' className="text-lg py-7 px-8 mt-8" >Give it a try</Button>
                <Button onClick={() => { }} variant='outline' size='lg' className="text-lg py-7 px-8 mt-8" >Learn more</Button>
            </div>
        </div>
    )
}

export default Header