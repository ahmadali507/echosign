/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import UserCard from './UserCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'
import { User } from '@/interfaces'
import { RootState } from '@/store/store'

const SentRequest = ({ totalPages, page, setPage, data }: { totalPages: number, page: number, setPage: any, data: User[] }) => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const { isLoading } = useSelector((state: RootState) => state.friend)


    return (
        <div className='flex flex-col gap-y-8 w-full' >
            <div className='w-full flex flex-col gap-4 '>
                {
                    isLoading
                        ?
                        Array(6).fill("").map((_, index) => (
                            <UserCard.Skeleton key={index} />
                        ))
                        :
                        data.length == 0
                            ?
                            <div className='col-span-4 w-full flex flex-col justify-center items-center grayscale '>
                                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                                <span className='text-muted-foreground text-center text-md ' >It's our fault, not yours.</span>
                            </div>
                            :
                            data.map((friend, index) => (
                                <UserCard key={index} friend={friend} type={'sentRequest'} />
                            ))
                }
            </div>

            {
                totalPages > 1 &&
                <div className="w-full flex justify-center">
                    <Pagination
                        count={totalPages}
                        defaultPage={1}
                        page={page}
                        siblingCount={0}
                        onChange={(e: any, page: number) => setPage(page)}
                        size='large'
                    />
                </div>
            }

        </div>
    )
}

export default SentRequest