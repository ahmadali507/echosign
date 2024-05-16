/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBox } from './ChatBox';
import { ChatList } from './ChatList';
import { RootState } from '@/store/store';
import { getChats } from '@/store/reducers/chatSlice';

const Chat = () => {

  /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { chats } = useSelector((state: RootState) => state.chat);
  console.log('chats', chats)
  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [userChats, setUserChats] = useState(chats);

  /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getChats())
  }, []);


  return (
    <div className="flex flex-col">
      <div className="h-[calc(110vh-186px)] overflow-hidden sm:h-[calc(110vh-174px)]">
        <div className="grid grid-cols-4 h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <ChatList
            chats={userChats}
            setChats={setUserChats}
          />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
