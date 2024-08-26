/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import ChatList from "./list/ChatList";
import { ChatListObj } from "../../../apiResponse";
import { useNavigate } from "react-router-dom";
import { fetchWrapper } from "../../../fetchWrapper";
import { API_PATH } from "../../../constants";

type Props = {

};

const ChatListContent:React.FC<Props> = React.memo(() => {

    // チャットリスト
    const [chatList, setChatList] = useState<ChatListObj[]>();

    // navigation
    const navigate = useNavigate();

    useEffect(() => {
        // チャットリスト取得
        fetchWrapper(API_PATH.CHAT_GET_LIST, "POST", null)
        .then(body => {
            console.log(body);
            // 初期表示データ設定
            setChatList(body);
        })
        .catch(err => {
            console.error(err);
        });
    });

    // チャットリストコンポーネントに渡すメソッド
    const selectChatList = (row: number) => {
        // 選択したチャットリスト
        let selectChatList = chatList && chatList[row];

        // navigationに値を設定し画面遷移
        navigate('/chat', {
            state: {
                chatList: selectChatList
            }
        });
    }

    return (
        <div>
            {/* ヘッダー */}
            <Header title="チャット一覧" />

            {/* 一覧表示 */}
            <div css={styles["list"]}>
                { chatList &&
                    <ChatList param={ chatList } selectChatList={ selectChatList }/>
                }
            </div>
        </div>
    )
})

const styles = {
    list: css`
        height: 80vh;
        margin-top: 64px;
        // 横幅は小さくする可能性があるため「%」で設定する
        // margin-left: 450px;
        // margin-right: 450px;
        margin-left: 30%;
        margin-right: 30%;
    `
}

export default ChatListContent;