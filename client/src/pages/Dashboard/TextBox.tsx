/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useState } from 'react';


const TextBox = () => {

    /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState(false)

    /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onTextToVoice = async () => {
        try {
            console.log('eher ew go')
            setLoading(true)
            const { data } = await axios.get('http://localhost:5000/api/text-to-speech')
            console.log('data', data)
        }
        catch (err) {
            console.log('error', err)
        }
        finally {
            setLoading(true)
        }
    }

    /////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <div className='w-full h-full rounded-lg flex flex-col gap-1 ' >

            <h2 className='text-xl font-medium ' >Input Text</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='w-full h-full bg-gray-100 rounded-lg p-4 text-black text-xl resize-none '
                placeholder='Type here...'
                rows={5}
            />
            <Button onClick={onTextToVoice} >{loading ? 'Converting' : 'Convert'}</Button>
        </div>
    )
}

export default TextBox