import { Button } from '@/components/ui/button'
import Audio from './Audio'

const AudioBox = () => {
    return (
        <div className='w-full h-full rounded-lg flex flex-col gap-1 ' >

            <h2 className='text-xl font-medium ' >Audio</h2>


            <div className="w-full h-full bg-gray-100 rounded-lg">
                <Audio />
            </div>

            <Button>Export</Button>
        </div>
    )
}

export default AudioBox
