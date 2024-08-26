/**
 * APIからのレスポンス
 */

export interface ChatListObj {
    chatListId: number
    , content: string
    , date: string
};

export interface ChatMessagesObj {
    message: string
    , sort: number
}