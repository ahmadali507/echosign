/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import FriendButton from '@/utils/FriendButton';

const UserCard = ({ friend: user }: { friend: User, type: string }) => {
  //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 shadow-md rounded-md flex justify-between">
      <div
        onClick={() => navigate(`/user/${user._id}`)}
        className="cursor-pointer w-full flex items-center gap-4"
      >
        <Avatar className="bg-slate-400">
          <AvatarImage src={user?.photoUrl} className="object-cover" />
          <AvatarFallback className="capitalize">
            {user?.username?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start items-start">
          <p className="hover:underline hover:text-green text-center text-sm font-medium text-dark-slate-blue-darken capitalize">
            {user?.firstName || 'firstName'} {user?.lastName}
          </p>
          <p>{user.username}</p>
        </div>
        <p className="text-cool-gray text-xs">
          ({Number(user?.mutualFriends) > 0 ? `${user?.mutualFriends} Mutual Friends` : 'No Mutual Friends'})
        </p>
      </div>
      <FriendButton user={user} />
    </div>
  );
};

UserCard.Skeleton = function () {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex justify-between animate-pulse">
      <div className="w-full flex items-center gap-4">
        <Avatar className="bg-slate-400">
          <AvatarFallback className="capitalize"></AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-start items-start">
          <p className="w-32 h-4 bg-gray-400 rounded" />
          <p className="w-20 h-4 bg-gray-300 rounded" />
        </div>
      </div>
      <div>
        <Button className="bg-gray-300 hover:bg-gray-300 px-12" />
      </div>
    </div>
  );
};

export default UserCard;
