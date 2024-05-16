/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptFriendRequest, rejectFriendRequest, removeFriendRequest, sendFriendRequest } from '@/store/reducers/friendSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RootState } from '@/store/store';
import { Chat, User } from '@/interfaces';
import { createChat, setChatSlice } from '@/store/reducers/chatSlice';

const FriendButton = ({ user }: { user: User }) => {

    //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chats } = useSelector((state: RootState) => state.chat)
    const { loggedUser } = useSelector((state: RootState) => state.user)
    const { userId } = useParams()
    const isProfilePage = Boolean(userId)
    const { friends, sentRequests, receivedRequests } = useSelector((state: RootState) => state.friend)

    const isFriend = friends.find(f => f?._id === user?._id);
    const isFriendRequestSent = sentRequests.find(f => f?._id === user?._id);
    const isFriendRequestReceived = receivedRequests.find(f => f?._id === user?._id);

    //////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////////
    const [loading, setLoading] = useState({ send: false, accept: false, reject: false, remove: false, chat: false });

    //////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////
    const handleSendFriendRequest = () => {
        setLoading((prev) => ({ ...prev, send: true }));
        dispatch<any>(sendFriendRequest(user?._id as string)).then(() => setLoading((prev) => ({ ...prev, send: false })));
    };

    const handleAcceptFriendRequest = () => {
        setLoading((prev) => ({ ...prev, accept: true }));
        dispatch<any>(acceptFriendRequest(user?._id as string)).then(() => setLoading((prev) => ({ ...prev, accept: false })));
    };

    const handleRemoveFriendRequest = () => {
        setLoading((prev) => ({ ...prev, remove: true }));
        dispatch<any>(removeFriendRequest(user?._id as string)).then(() => setLoading((prev) => ({ ...prev, remove: false })));
    };

    const handleRejectFriendRequest = () => {
        setLoading((prev) => ({ ...prev, reject: true }));
        dispatch<any>(rejectFriendRequest(user?._id as string)).then(() => setLoading((prev) => ({ ...prev, reject: false })));
    };

    const onCreateChat = () => {

        setLoading((pre) => ({ ...pre, chat: false }));
        const existingChat = chats.filter((chat: Chat) => chat?.participants?.findIndex(p => String((p as User)._id) == String(user._id)) != -1);
        if (existingChat.length > 0) {
            localStorage.setItem('lastChat', String(existingChat[0]?._id));
            dispatch(setChatSlice(existingChat[0]))
            setLoading((pre) => ({ ...pre, chat: false }));
            navigate('/chat');
        }
        else {
            const newChatData: Chat = {
                participants: [String(loggedUser?._id), String(user?._id)],
                lastMessage: '',
                lastMessageTimestamp: new Date(),
            };
            dispatch<any>(createChat(newChatData))
                .then(({ payload }: { payload: Chat }) => {
                    if (payload) {
                        localStorage.setItem('lastChat', String(payload?._id));
                        navigate('/chat');
                    }
                })
                .finally(() => {
                    setLoading(pre => ({ ...pre, chat: false }))
                })
        }
    }

    return (
        <div>
            {isFriend && !isProfilePage && (
                <div className='flex gap-4' >
                    <Button variant='secondary' className="" onClick={onCreateChat}>
                        {loading.chat ? 'Loading' : 'Message'}
                    </Button>
                    <Button className="bg-black hover:bg-black/80" onClick={() => navigate(`/user/${user?._id}`)}>
                        View Profile
                    </Button>
                </div>
            )}
            {isFriendRequestSent && (
                <Button variant='destructive' disabled={loading.remove} onClick={handleRemoveFriendRequest}>
                    {loading.remove ? 'Loading' : 'Remove Request'}
                </Button>
            )}
            {isFriendRequestReceived && (
                <div className="flex justify-between gap-2 mt-1">
                    <Button
                        disabled={loading.reject}
                        variant="destructive"
                        onClick={handleRejectFriendRequest}
                    >
                        {loading.reject ? 'Loading' : 'Reject'}
                    </Button>
                    <Button
                        disabled={loading.accept}
                        onClick={handleAcceptFriendRequest}
                    >
                        {loading.accept ? 'Loading' : 'Accept Request'}
                    </Button>
                </div>
            )}
            {!isFriend && !isFriendRequestSent && !isFriendRequestReceived && (
                <div className="flex justify-between gap-2 mt-1">
                    <Button disabled={loading.send} onClick={handleSendFriendRequest}>
                        {loading.send ? 'Loading' : 'Add Friend'}
                    </Button>
                    {
                        !isProfilePage &&
                        <Button
                            className="bg-black hover:bg-black/80"
                            onClick={() => navigate(`/user/${user?._id}`)}
                        >
                            View Profile
                        </Button>
                    }
                </div>
            )}
        </div>
    )
}

export default FriendButton