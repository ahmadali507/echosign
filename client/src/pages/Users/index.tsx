/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react';
import Friends from './Friends'
import Menubar from './Menubar';
import SuggestedFriends from './SuggestedFriends';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';
import Find from './Find';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getFriends, getReceivedRequests, getSentRequests, getSuggestedUsers, searchFriends, searchUsers } from '@/store/reducers/friendSlice';
import { RootState } from '@/store/store';
import { getUsers } from '@/store/reducers/userSlice';

const Users = () => {

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedQuery, setSearchedValue] = useState<string>('');
    const [activeMenuItem, setActiveMenuItem] = useState<'find' | 'friends' | 'suggested' | 'received' | 'sent'>('find');
    const [page, setPage] = useState<number>(1)

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { friends, receivedRequests, sentRequests, suggestedUsers } = useSelector((state: RootState) => state.friend)
    const { users } = useSelector((state: RootState) => state.user)
    const pageSize = 20;
    const maxLength = activeMenuItem == 'find' ? users?.length : activeMenuItem == 'friends' ? friends?.length : activeMenuItem == 'suggested' ? suggestedUsers?.length : activeMenuItem == 'sent' ? sentRequests?.length : receivedRequests?.length;
    const totalPages = Math.ceil(maxLength / pageSize);

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        if (users.length == 0) dispatch<any>(getUsers())
        if (receivedRequests.length == 0) dispatch<any>(getReceivedRequests(`?page=${page}&pageSize=${pageSize}`))
        if (sentRequests.length == 0) dispatch<any>(getSentRequests(`?page=${page}&pageSize=${pageSize}`))
        if (suggestedUsers.length == 0) dispatch<any>(getSuggestedUsers(`?page=${page}&pageSize=${pageSize}`))
        if (friends.length == 0) dispatch<any>(getFriends(`?page=${page}&pageSize=${pageSize}`))
    }, [activeMenuItem, dispatch])  // page, pageSize

    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const onSearch = () => {
        setSearchedValue(searchValue)
        if (activeMenuItem == 'find')
            dispatch<any>(searchUsers(`?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`)) //true, 
        else
            dispatch<any>(searchFriends(`?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`))   //true, 
    }


    return (
        <div className="p-6 flex flex-col gap-4 w-full ">

            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-dark-slate-blue " >
                    Friends {searchedQuery && <span className="font-medium"> {" > "} <span className='text-green ' >{searchedQuery}</span></span>}
                </h1>
                <div className="relative w-1/3 ">
                    <Input
                        placeholder="Search Friends..."
                        value={searchValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        onKeyDown={(e: any) => e.key == 'Enter' && onSearch()}
                        className="w-full px-4 py-2"
                    />
                    <button title='Search' onClick={onSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <Search />
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-4">
                <div className="col-span-1 flex justify-center items-center w-full ">
                    <Menubar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
                </div>
                <div className="col-span-3 w-full px-4 ">
                    {activeMenuItem === 'find' && <Find totalPages={totalPages} page={page} setPage={setPage} />}
                    {activeMenuItem === 'friends' && <Friends totalPages={totalPages} page={page} setPage={setPage} />}
                    {activeMenuItem === 'suggested' && <SuggestedFriends totalPages={totalPages} page={page} setPage={setPage} />}
                    {activeMenuItem === 'sent' && <SentRequests totalPages={totalPages} page={page} setPage={setPage} />}
                    {activeMenuItem === 'received' && <ReceivedRequests totalPages={totalPages} page={page} setPage={setPage} />}
                </div>
            </div>



        </div>
    );
};

export default Users;
