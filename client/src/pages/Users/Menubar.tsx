/* eslint-disable @typescript-eslint/no-explicit-any */

const Menubar = ({ activeMenuItem, setActiveMenuItem }: { activeMenuItem: any, setActiveMenuItem: any }) => {
    const menuItems = [
        { label: 'All Users', value: 'Find' },
        { label: 'Your Friends', value: 'Friends' },
        { label: 'Suggested For You', value: 'Suggested' },
        { label: 'Friend Requests', value: 'Received' },
        { label: 'Send Invitations', value: 'Sent' },
    ];

    return (
        <div className="flex justify-start items-start w-full h-full mt-4 ">
            <div className="bg-white shadow-md rounded-lg flex flex-col overflow-hidden w-full h-fit ">
                {menuItems.map(item => (
                    <button
                        key={item.value}
                        className={`text-startyy py-2 px-4 ${activeMenuItem.toLowerCase() === item?.value?.toLowerCase()
                            ? 'bg-green text-white'
                            : 'text-cool-gray'
                            } hover:bg-green/80 hover:text-white transition-all duration-200 focus:outline-none`}
                        onClick={() => setActiveMenuItem(item?.value?.toLowerCase())}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menubar;
