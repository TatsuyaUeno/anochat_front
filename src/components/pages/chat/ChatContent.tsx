/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../../..";
import Header from "../../layouts/Header";
import ChatDisp from "./disp/ChatDisp";
import ChatInput from "./disp/ChatInput";
import { ChatListObj, ChatMessagesObj } from "../../../apiResponse";
import { useLocation } from "react-router-dom";
import { fetchWrapper } from "../../../fetchWrapper";
import { API_PATH } from "../../../constants";


type Props = {

};


/**
 * チャット画面の親コンポーネント
 */
const ChatContent:React.FC<Props> = React.memo(() => {
        /* チャット一覧選択項目 */
        const [selectedChatList, setSelectedChatList] = useState<ChatListObj>();
        /* チャット内容 */
        const [chatContentList, setChatContentList] = useState<ChatMessagesObj[]>();

        // location
        const location = useLocation();
        // navigation
        const navigate = useNavigate();

        /**
         * websocketは副作用の処理なので、useEffectを用いる
         */
        useEffect(() => {
            // 接続開始
            socket.onopen = (event) => {
                console.log("websocket connected!");
            };
            // メッセージ受信ハンドラ
            socket.onmessage = (event) => {
                if (chatContentList) {
                   setChatContentList([event.data, ...chatContentList]);
                }
            };
            // 接続終了ハンドラ
            socket.onclose = (event) => {
                console.log("websocket closed!");
            };

            // チャット一覧画面から受け取ったデータを取得
            // nullチェック
            const selectChatList = location.state !== null ? location.state.chatList : null;
            // 直リンク防止
            if (selectChatList === null || selectChatList === undefined) {
                alert("チャット画面の表示に失敗しました。チャット一覧から再度選択してください。");
                navigate("/list");
                return;
            }
            setSelectedChatList(selectChatList);
            const chatListId = selectChatList.chatListId;

            // チャット取得API呼び出し
            fetchWrapper(API_PATH.CHAT_GET_MESSAGES, "POST", {chatid: chatListId})
            .then(body => {
                console.log(body);
                // 初期表示データ設定
                setChatContentList(body);
            })
            .catch(err => {
                console.error(err);
            });
        }, []);

    return (
        <div>
            {/* ヘッダー */}
            <Header title="LT発表会" />

            <div css={styles["chatContent"]}>
                {/* チャット表示 */}
                <div css={styles["chatDisp"]}>
                    { chatContentList &&
                        <ChatDisp chatMessages={ chatContentList } />
                    }
                </div>

                {/* チャット入力 */}
                <div css={styles["chatInput"]}>
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
})

const styles = {
    chatContent: css`
        display: flex;
        margin-top: 64px;
        height: 100%;
    `,
    chatDisp: css`
        flex-grow: 1;
        margin-left: 100px;
        margin-right: 40px;
        width: 50%;
    `,
    chatInput: css`
        flex-grow: 1;
        margin-left: 40px;
        margin-right: 100px;
        width: 50%;
        background-color: #F4F5F6;
    `
}

export default ChatContent;