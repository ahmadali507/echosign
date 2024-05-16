import { User } from "@/interfaces";

export const getOtherUserDetail = (chatParticipantIds: string[], users: User[], currentUserId: string) => {
    if (!currentUserId) currentUserId = String(localStorage.getItem('userId'))
    const otherUserId = chatParticipantIds?.find((pId) => pId != currentUserId);
    const otherUser = users?.find((user) => user?._id === otherUserId);
    return otherUser;
};
