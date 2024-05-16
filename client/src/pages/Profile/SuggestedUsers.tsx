/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getSuggestedUsers } from '@/store/reducers/friendSlice'
import UserCard from '../Users/UserCard'

const SuggestedFriends = () => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { suggestedUsers, isLoading } = useSelector((state: RootState) => state.friend)

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getSuggestedUsers(`?page=${1}&pageSize=${10}`)) //suggestedUsers.length == 0,
    }, [])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////

    return (
        <div className='flex flex-col gap-y-2 mt-4 w-full' >

            <h3 className="font-semibold text-2xl ">Suggested For You</h3>

            <div className='w-full flex flex-col gap-4 '>
                {
                    isLoading
                        ?
                        Array(6).fill("").map((_, index) => (
                            <UserCard.Skeleton key={index} />
                        ))
                        :
                        suggestedUsers.map((friend, index) => (
                            <UserCard key={index} friend={friend} type={'suggestedUser'} />
                        ))
                }
            </div>
        </div>
    )
}

export default SuggestedFriends