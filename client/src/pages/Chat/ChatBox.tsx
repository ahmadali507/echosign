/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send } from 'lucide-react';
import { useStateContext } from '@/context/useStateContext';
import { RootState } from '@/store/store';
import { getOtherUserDetail } from '@/utils/functions';
import { setChatSlice } from '@/store/reducers/chatSlice';
import { Chat, Message } from '@/interfaces';

export const ChatBox = () => {
  ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { selectedChat, setSelectedChat } = useStateContext();
  const { users } = useSelector((state: RootState) => state.user);
  const { chats, currentChat } = useSelector((state: RootState) => state.chat);
  const currentUserId = String(localStorage.getItem('userId'));
  const lastChatId = localStorage.getItem('lastChat') ? String(localStorage.getItem('lastChat')) : null;

  ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const [messageInput, setMessageInput] = useState('');

  ///////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [selectedChat]);
  useEffect(() => {
    if (lastChatId && !selectedChat) {
      const finded = chats?.find((c) => c?._id == lastChatId);
      if (!finded) return;
      const otherUser = getOtherUserDetail(finded?.participants?.map(f => String(f?._id)), users, currentUserId);
      setSelectedChat({ ...finded, otherUser });
    }
  }, []);
  useEffect(() => {
    if (selectedChat) {
      // Socket: Fetch messages chatId: selectedChat._id
    } else if (lastChatId) {
      // Socket: Fetch messages chatId: selectedChat._id
    }
  }, [selectedChat, dispatch]);
  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
  const onSendMessage = (inputMessage?: string) => {
    const msgInput = inputMessage ? inputMessage : messageInput;

    if (msgInput.trim() == '') return;

    const newMessage = { senderId: currentUserId, text: msgInput, timestamp: new Date(), readBy: [currentUserId] };

    dispatch(setChatSlice({ ...currentChat, messages: [...(currentChat?.messages || []), newMessage] }));

    // Update last message of chat
    dispatch(setChatSlice(chats.map((c: Chat) => (c = c._id == selectedChat._id ? { ...c, lastMessage: msgInput, lastMessageTimestamp: new Date() } : c))));

    // Create message in db
    //  Socket: send message

    scrollToBottom();
    setMessageInput('');
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      setTimeout(() => {
        scrollContainer.scroll({
          top: scrollContainer.scrollHeight - scrollContainer.clientHeight,
          behavior: 'smooth',
        });
      }, 20);
    }
  };

  ///////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
  const MessageComponent = ({ name, message, time, isMe, }: { name: string; message: string; time: Date; isMe: boolean; }) => {
    return (
      <div className={isMe ? 'ml-auto max-w-125' : 'max-w-125'}>
        {!isMe && <p className="mb-2.5 text-sm font-medium">{name}</p>}
        <div
          className={`mb-2.5 rounded-2xl px-5 py-3 dark:bg-boxdark-2 ${isMe ? 'rounded-br-none bg-primary text-white' : 'rounded-tl-none bg-whiten'} `}
        >
          <p>{message}</p>
        </div>
        <p className={`text-xs ${isMe ? 'text-end' : 'text-start'}`}>{time?.getTime()}</p>
      </div>
    );
  };


  return (
    <>
      {
        chats.length == 0
          ?
          (
            <div className="flex h-full w-full col-span-3 items-center justify-center">
              <p className="text-3xl font-semibold text-muted-foreground ">No current conversation</p>
            </div>
          )
          :
          !selectedChat?._id
            ?
            (
              <div className="flex h-full w-full col-span-3 items-center justify-center">
                <p className="text-3xl font-semibold text-muted-foreground ">Select a conversation</p>
              </div>
            )
            : (
              <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark col-span-3 ">
                {/* <!-- ====== Chat Box Start --> */}
                <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
                  <div className="flex items-center">
                    <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                      {selectedChat?.otherUser?.photoUrl ? (
                        <img
                          src={selectedChat?.otherUser?.photoUrl}
                          alt="avatar"
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black capitalize text-white ">
                          {selectedChat?.otherUser?.username?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h5 className="w-max font-medium capitalize text-black dark:text-white ">
                        {selectedChat?.otherUser?.username}
                      </h5>
                    </div>
                  </div>
                </div>
                <div ref={scrollRef} className="n-scrollbar h-full max-h-full space-y-3.5 overflow-y-auto px-6 py-7.5 ">
                  {currentChat?.messages?.map((msg: Message, index: number) => (
                    <MessageComponent
                      key={index}
                      name={selectedChat?.otherUser?.username as string}
                      message={msg.text}
                      time={msg.timestamp}
                      isMe={msg?.sender?._id == currentUserId}
                    />
                  ))}
                </div>
                <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
                  <form className="flex items-center justify-between space-x-4.5">
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder={"Type your message"}
                        className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // Prevent the default Enter key behavior (line break)
                            onSendMessage(); // Call the sendMessageHandler when Enter is pressed
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      title="Send Message"
                      onClick={(e) => { e.preventDefault(); onSendMessage(); }}
                      className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-primary/75"
                    >
                      <Send />
                    </button>
                  </form>
                </div>

              </div>
            )}
    </>
  );
};
