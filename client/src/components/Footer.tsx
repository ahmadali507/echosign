import { whatsapp } from '@/assets'
import { twitter } from '@/assets'
import { messenger } from '@/assets'
import { instagram } from '@/assets'
import { facebook } from '@/assets'
import { email } from '@/assets'
import { github } from '@/assets'
import { copyright } from '@/assets'
import { Logo } from '@/assets'
import { Linkedin } from 'lucide-react'
import { IoLogoYoutube } from 'react-icons/io'
import { SiDiscord } from 'react-icons/si'
{/*
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button' */}

const Footer = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    {/*const navigate = useNavigate()*/}

    return (
        <div>
            <div className='border border-black py-0 w-full'></div>

            <div className="flex justify-between ml-24 mr-56 mt-20">
                    <div className="text-left text-black text-md mb-4 max-w-sm">
                        <img src={Logo} alt="Image" className="w-36 z-10" />
                        <h1>Make Communication easier and efficient with EchoSign. Bridge the gap, don't let anything stop you! </h1>        
                    </div>
                    <div className="text-left text-black text-sm font-bold mb-10 max-w-md">
                        <p className='pb-2'>Help</p>
                        <p className='pb-2'>FAQs</p>
                        <p className='pb-2'>Reviews</p>
                        <p className='pb-2'>About Us</p>
                        <p className='pb-2'>Contact Us</p>
                        <p className='pb-2'>Privacy Policy </p>
                        <p className='pb-2'>Terms and Conditions </p>
                    </div>
                    
                    
                </div>
            
        {/*
        FAQs
        About Us
        Privacy Policy 
        Privacy Policy 
        Contact Us
        Reviews
        Help
        */}
        <div className="flex justify-between items-center px-96 py-4 h-fit bg-white w-full ">
            <IoLogoYoutube />
            <img src={whatsapp} alt="Image" className="w-6 z-10" />
            <img src={twitter} alt="Image" className="w-6 z-10" />
            <img src={instagram} alt="Image" className="w-6 z-10" />
            <img src={messenger} alt="Image" className="w-6 z-10" />
            <img src={email} alt="Image" className="w-6 z-10" />
            <img src={facebook} alt="Image" className="w-6 z-10" />
            <img src={github} alt="Image" className="w-6 z-10" />
            <Linkedin />
            <SiDiscord className='w-6 h-6 z-10'/>
        </div>
        <div className='pt-4 flex justify-center items-center bg-white h-fit w-full'>
            <p className="mr-1">Copyright</p>
            <img src={copyright} alt="Copyright" className="w-4 z-10" />
            <p className="ml-1">2024 EchoSign</p>
        </div>


        </div>


    )
}

export default Footer
