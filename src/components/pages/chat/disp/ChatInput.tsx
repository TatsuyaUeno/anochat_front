/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

import socket from "../../../..";

type Props = {

};

const ChatInput: React.FC<Props> = React.memo(() => {
    const [inputChat, setInputChat] = useState("");

    const sendChat = () => {
        // websocketでチャット送信
        socket.send(inputChat);
    }

    return (
        <div css={styles["all"]}>
            {/* テキスト入力エリア */}
            <div css={styles["inputArea"]}>
                <textarea placeholder="Aa" value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}>
                </textarea>
                <div onClick={ sendChat }>
                    <img src="../static/images/icon_send_button.png"/>
                </div>
            </div>
        </div>
    )
})

const styles = {
    all: css`
        position: relative;
        padding: 28px 27px 20px 27px;
        height: 100%;
    `,
    inputArea: css`
        width: 100%;
        height: 100%;
        textarea {
            width: 100%;
            height: 95%;
            background: #F4F5F6;
            border: none;
            resize: none;
            outline: none;
            color: #33437A;
        }
        // 画像
        img {
            position: absolute;
            left: 87%;
            height: 40px;
            cursor: pointer;
        }
    `
}

export default ChatInput;