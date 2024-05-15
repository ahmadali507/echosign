/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptFriendRequest, rejectFriendRequest, removeFriendRequest, sendFriendRequest } from '@/store/reducers/friendSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RootState } from '@/store/store';
import { User } from '@/interfaces';

const FriendButton = ({ user }: { user: User }) => {

    //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams()
    const isProfilePage = Boolean(userId)
    const { friends, sentRequests, receivedRequests } = useSelector((state: RootState) => state.friend)

    const isFriend = friends.find(f => f._id === user._id);
    const isFriendRequestSent = sentRequests.find(f => f._id === user._id);
    const isFriendRequestReceived = receivedRequests.find(f => f._id === user._id);

    //////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////////
    const [loading, setLoading] = useState({
        send: false,
        accept: false,
        reject: false,
        remove: false,
    });

    //////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////
    const handleSendFriendRequest = () => {
        setLoading((prev) => ({ ...prev, send: true }));
        dispatch<any>(sendFriendRequest(user?._id as string)).then(() =>
            setLoading((prev) => ({ ...prev, send: false }))
        );
    };

    const handleAcceptFriendRequest = () => {
        setLoading((prev) => ({ ...prev, accept: true }));
        dispatch<any>(acceptFriendRequest(user?._id as string)).then(() =>
            setLoading((prev) => ({ ...prev, accept: false }))
        );
    };

    const handleRemoveFriendRequest = () => {
        setLoading((prev) => ({ ...prev, remove: true }));
        dispatch<any>(removeFriendRequest(user?._id as string)).then(() =>
            setLoading((prev) => ({ ...prev, remove: false }))
        );
    };

    const handleRejectFriendRequest = () => {
        setLoading((prev) => ({ ...prev, reject: true }));
        dispatch<any>(rejectFriendRequest(user?._id as string)).then(() =>
            setLoading((prev) => ({ ...prev, reject: false }))
        );
    };

    return (
        <div>
            {isFriend && !isProfilePage && (
                <Button className="bg-black hover:bg-black/80" onClick={() => navigate(`/user/${user._id}`)}>
                    View Profile
                </Button>
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
                    <Button
                        className="bg-black hover:bg-black/80"
                        onClick={() => navigate(`/user/${user._id}`)}
                    >
                        View Profile
                    </Button>
                </div>
            )}
        </div>
    )
}

export default FriendButton