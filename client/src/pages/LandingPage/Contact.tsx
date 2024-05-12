import { contact, recording, selfie, video } from '@/assets'
import { Button } from '@/components/ui/button'
import React from 'react'

const Contact = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////


    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-32 ">
            <div className="flex flex-col justify-center items-center w-full h-fit  ">
                <h2 className="text-5xl font-bold text-foreground ">Contact Us</h2>
                <span className=' px-32 mt-4 text-center ' >For any inquiries or assistance, don't hesitate to reach out to us.</span>
            </div>
            <div className="bg-gray-100 grid grid-cols-2 justify-center gap-12 mt-20 w-full rounded-lg px-8 py-12 ">
                <div className="col-span-1">
                    <img src={contact} alt="" className='h-full px-12' />
                </div>
                <div className="col-span-1 flex flex-col gap-4 ">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder='John Doe'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Email</label>
                        <input
                            type="text"
                            placeholder='John Doe'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Subject</label>
                        <input
                            type="text"
                            placeholder='John Doe'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Message</label>
                        <textarea
                            rows={5}
                            placeholder='John Doe'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button className='' >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default Contact