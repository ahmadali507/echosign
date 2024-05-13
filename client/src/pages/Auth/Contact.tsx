/* eslint-disable @typescript-eslint/no-explicit-any */
import { contact as contactImage } from '@/assets'
import { Button } from '@/components/ui/button'
import { contact } from '@/store/reducers/authSlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Login = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const intiialData = { name: '', email: '', subject: '', message: '' }

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
    const [formData, setFormData] = useState(intiialData)
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData?.name) return toast.error('Name is required.')
        if (!formData?.email) return toast.error('Email is required.')
        if (!formData?.subject) return toast.error('Subject is required.')
        if (!formData?.message) return toast.error('Message is required.')

        setLoading(true)
        dispatch<any>(contact(formData))
            .finally(() => {
                setFormData(intiialData)
                setLoading(false)
            })
    }


    ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
    return (
        <div className="grid grid-cols-2">
            <div className="col-span-1 w-full h-full flex items-center ">
                <img src={contactImage} alt="Image" className="ml-20 w-8/12 z-10" />
            </div>
            <div style={{ height: 'calc(100vh - 5rem)' }} className="col-span-1 flex justify-end items-center h-screen mb-14 mt-6">
                <div className="container mt-16 mb-8 mx-auto p-8 pb-4 w-[32rem] rounded-lg shadow-md border border-black">
                    <h1 className="text-center font-sans font-bold text-4xl mb-12 ">Contact</h1>
                    <form onSubmit={onSubmit} className="col-span-1 flex flex-col gap-4 ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={onChange}
                                placeholder='John Doe'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Email</label>
                            <input
                                type="text"
                                name='email'
                                value={formData.email}
                                onChange={onChange}
                                placeholder='johndoe@example.com'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Subject</label>
                            <input
                                type="text"
                                name='subject'
                                value={formData.subject}
                                onChange={onChange}
                                placeholder='Subject'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Message</label>
                            <textarea
                                rows={5}
                                name='message'
                                value={formData.message}
                                onChange={onChange}
                                placeholder='Place your message here'
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button className='bg-green' disabled={loading} >{loading ? 'Processing...' : 'Submit'}</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login