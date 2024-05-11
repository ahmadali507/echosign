
import { copyright } from '@/assets'
import { Logo } from '@/assets'
import { Button } from './ui/button'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'


const Footer = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    return (
        <div className='flex flex-col gap-24 border-t mt-20 pt-12 ' >
            <div className="grid grid-cols-2 gap-36 w-full ">
                <div className="col-span-1 w-full flex flex-col gap-4">
                    <img src={Logo} alt="Image" className="w-36 z-10" />
                    <h1>At EchoSign, we are driven by a singular mission: to empower individuals with special needs through innovative technology. We believe that effective communication is a fundamental right for all, and we're committed to breaking down barriers to ensure that everyone can express themselves freely.</h1>
                </div>
                <div className="col-span-1 flex flex-col gap-8 w-full">

                    <div className="flex flex-col justify-between gap-2">
                        <h3 className='text-xl text-foreground font-semibold ' >Social links</h3>
                        <div className="flex justify-start items-center gap-4 w-full ">
                            <Twitter className=' ' />
                            <Instagram className=' ' />
                            <Mail className=' ' />
                            <Github className=' ' />
                            <Linkedin className=' ' />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className='text-xl text-foreground font-semibold ' >Subscribe to our newsletter</h3>
                        <div className="flex justify-between items-center gap-2 ">
                            <input
                                type="text"
                                placeholder='Enter your email'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button className='' >Subscribe  </Button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col justify-center items-center gap-2 ">
                <div className="flex justify-center gap-4 text-black text-sm font-bold">
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>Help</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>FAQs</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>Reviews</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>About Us</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>Contact Us</Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>Privacy Policy </Link>
                    <Link to='/' className='hover:text-green hover:underline cursor-pointer'>Terms and Conditions </Link>
                </div>
                <div className='flex justify-center items-center bg-white h-fit w-full mt-4'>
                    <p className="mr-1">Copyright</p>
                    <img src={copyright} alt="Copyright" className="w-4 z-10" />
                    <p className="ml-1">2024 EchoSign</p>
                </div>

            </div>

        </div>


    )
}

export default Footer
