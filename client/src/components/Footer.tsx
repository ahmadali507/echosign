import { youtube } from '@/assets'
import { whatsapp } from '@/assets'
import { twitter } from '@/assets'
import { messenger } from '@/assets'
import { instagram } from '@/assets'
import { facebook } from '@/assets'
import { email } from '@/assets'
import { github } from '@/assets'
import { copyright } from '@/assets'
{/*
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button' */}

const Footer = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    {/*const navigate = useNavigate()*/}

    return (
        <div>
            <div className='border border-black py-0 w-full'></div>

            <div className="flex justify-between ml-56 mr-56 mt-20">
                    <div className="text-left text-black text-3xl font-bold mb-4 max-w-md">
                        <h1>Make Communication easier and efficient with EchoSign. </h1>
                        
                    </div>
                    <div className="text-right text-black text-sm font-bold mt-2 mb-4 max-w-md">
                        <h1>AI has the potential to gently nudge aside communication barriers between sign language and spoken language. Imagine conversations flowing effortlessly, with spoken words finding a graceful expression in signs and vice versa. This wouldn't just bridge the language gap, but could foster a deeper understanding between deaf and hearing communities.</h1>
                    </div>
                    
                </div>
            
        {/*
        FAQs
        About Us
        Privacy Policy 
        Terms and Conditions
        Contact Us
        Reviews
        Help
        */}
        <div className="flex justify-between items-center px-96 py-4 h-fit bg-white w-full ">
            <img src={youtube} alt="Image" className="w-6 z-10" />
            <img src={whatsapp} alt="Image" className="w-6 z-10" />
            <img src={twitter} alt="Image" className="w-6 z-10" />
            <img src={instagram} alt="Image" className="w-6 z-10" />
            <img src={messenger} alt="Image" className="w-6 z-10" />
            <img src={email} alt="Image" className="w-6 z-10" />
            <img src={facebook} alt="Image" className="w-6 z-10" />
            <img src={github} alt="Image" className="w-6 z-10" />
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
