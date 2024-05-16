import Chat from '../models/chat.js'

export const getChats = async (req, res, next) => {
    try {
        const userId = req.user._id

        const chats = await Chat.find({ participants: userId }).sort({ lastMessageTimestamp: -1 }).exec();

        res.status(200).json(chats)
    } catch (error) {
        console.error('fetchChats error: ', error);
        throw error;
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const findedChat = await Chat.find(chatId, { messages: 1 }).populate('messages').exec();
        const messages = findedChat[0].messages;

        res.status(200).json(messages)

    } catch (error) {
        console.error('getMessages error: ', error);
        throw error;
    }
}

export const getUnreadMessageCount = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId  not found"));

        const userId = req.user._id

        const chat = await Chat.findOne(chatId).populate('messages').exec();

        const messages = chat.messages;
        const readMessages = messages.filter((message) => message?.readBy.includes(userId));
        const unreadMessagesCount = messages.length - readMessages.length;

        res.status(200).json(unreadMessagesCount)
    } catch (error) {
        console.error('getUnreadMessageCount error: ', error);
        throw error;
    }
}

export const getChat = async (req, res, next) => {
    try {
        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const findedChat = await Chat.findOne(chatId).exec();

        res.status(200).json(findedChat)
    }
    catch (err) {
        console.error('fetchChat error: ', err);
        throw err;
    }
}

export const createChat = async (req, res, next) => {
    try {

        const { participants } = req.body
        if (participants == 0) return next(createError(res, 400, "Participants can't be empty"));

        const result = await Chat.create({ ...req.body });

        res.status(200).json(result)
    } catch (error) {
        console.error('createChat error: ', err);
        throw err;
    }
}

export const updateChat = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const { participants } = req.body
        if (participants == 0) return next(createError(res, 400, "Participants can't be empty"));

        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $set: { ...req.body } }, { new: true }).exec();
        return updatedChat;

    } catch (error) {
        console.error('updateChat error: ', error);
        throw error;
    }
}


export const sendMessage = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const { message } = req.body
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: message }, $set: { lastMessage: message.text, lastMessageTimestamp: new Date() } },
            { new: true }
        ).exec();

        res.status(200).json(chat);
    } catch (error) {
        console.error('sendMessage error: ', error);
        throw error;
    }
}

export const markMessageAsRead = async (req, res, next) => {
    try {

        const { chatId, messageId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));
        if (!message) return next(createError(res, 400, "MessageId not found"));

        const userId = req.user._id

        const chat = await Chat.fineOneAndUpdate(
            { _id: chatId, 'messages._id': messageId },
            { $addToSet: { 'messages.$.readBy': userId } }
        ).exec();

        res.status(200).json(chat);
    } catch (error) {
        console.error('markMessageAsRead error: ', error);
        throw error;
    }
}

export const markAllMessagesAsRead = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const userId = req.user._id

        const chat = await Chat.fineOneAndUpdate(
            { _id: chatId, 'messages.readBy': { $nin: [userId] } },
            { $addToSet: { 'messages.$.readBy': userId } }
        ).exec();

        res.status(200).json(chat)
    } catch (error) {
        console.error('markAllMessagesAsRead error: ', error);
        throw error;
    }
} 