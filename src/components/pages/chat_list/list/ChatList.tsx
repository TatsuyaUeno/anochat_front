
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import { ChatListObj } from "../../../../apiResponse";

type Props = {
    param: ChatListObj[],
    selectChatList: (row: number) => void;
};

const ChatList:React.FC<Props> = React.memo(( {param, selectChatList} ) => {

    // チャットリスト選択時
    const selectList = (row: number) => {
        selectChatList(row);
    }

    const messages = param.map((obj: ChatListObj, row: number) =>
        <div css={styles["chatListContent"]} onClick={ () => selectList(row) }>
            <span css={styles["chatListName"]}>
                { obj.content }
            </span>
            <span css={styles["chatListDate"]}>
                { obj.date }
            </span>
        </div>
    );

    return (
        <div css={styles["all"]}>
            <div css={styles["disp"]}>
                { messages }
            </div>
        </div>
    )
})

const styles = {
    all: css`
        width: 100%;
    `,
    disp: css`
        overflow-y: scroll;
        height: 80vh;
        margin: auto;

        // スクロールバーの設定
        ::-webkit-scrollbar-thumb {
            width: 1px;
            border-radius: 200px;
            background-color: #33437A;
        }
        // スクロールバー全体の設定
        ::-webkit-scrollbar {
            width: 5px;
            background-color: #F4F5F6;
        }
    `,
    chatListContent: css`
        padding: 0.5rem 1rem;
        display: flex;
        // 下線
        border-bottom: 1px solid #DADFEE;
        margin-right: 5px;
        :hover {
            cursor: pointer;
            background-color: #F0F2F8;
        }
    `,
    chatListName: css`
    `,
    chatListDate: css`
        // 左寄せ
         margin-left: auto;
    `
}

export default ChatList;