/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { ChatMessagesObj } from "../../../../apiResponse";

type Props = {
    chatMessages: ChatMessagesObj[]
};

/**
 * チャット画面のトーク表示部分
 */
const ChatDisp: React.FC<Props> = React.memo(( {chatMessages} ) => {

    const messages = chatMessages.map((chatMessage: {message: string, sort: number}) => 
        <div css={styles["chat"]}>
            { chatMessage.message }
        </div>
    );

    return (
        <div css={styles["all"]}>
        { !chatMessages ?
            (
            // メッセージが存在しない場合
            <div>
                <div css={styles["noneDisp"]}>会話を始めましょう！</div>
            </div>
            ) : (
            // メッセージが存在する場合
            <div css={styles["chatDisp"]}>
                { messages }
            </div>
            )
        }
        </div>
    )
})

const styles = {
    all: css`
        height: 100%;
    `,
    noneDisp: css`
        text-align: center;
        vertical-align: middle;
    `,
    chatDisp: css`
        overflow-y: auto;
        height: 80vh;

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
    chat: css`
        // 全体
        display: table;
        background-color: #EFF2FD;;
        border-radius: 30px;
        padding: 0.5rem 1rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        word-break: break-word;
        // 文字
        font-size: 16px;
        color: #33437A;
    `
}

export default ChatDisp;