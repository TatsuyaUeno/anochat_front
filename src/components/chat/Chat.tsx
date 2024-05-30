/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect, useCallback } from "react";
import ChatList from "./ChatList";
import { socket } from "../..";

const Chat = React.memo(() => {
  // 表示するチャットリスト
  const [msgList, setMsgList] = useState<string[]>([]);

  // 入力したメッセージ
  const [inputMsg, setInputMsg] = useState<string | undefined>(undefined);

  // メッセージ入力・変更時
  const handleChangeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      setInputMsg(text);
    },
    [setInputMsg]
  );

  // 新しいメッセージ受信時
  const applyNewMsg = useCallback(
    (newMsg: string) => {
      const newMsgList = [...msgList, newMsg];
      setMsgList(newMsgList);
      console.log(newMsg, newMsgList);
    },
    [msgList, setMsgList]
  );

  /**
   * websocketは副作用の処理なので、useEffectを用いる
   */

  useEffect(() => {
    // 接続開始
    socket.onopen = (event) => {
      console.log("websocket connected!");
    };
  }, []);

  useEffect(() => {
    // メッセージ受信
    socket.onmessage = (event) => {
      const newMsg: string = event.data;
      applyNewMsg(newMsg);
    };

    // 接続終了
    socket.onclose = (event) => {
      console.log("websocket closed!");
    };

    // ↓socketのみ除外する
  }, [applyNewMsg, msgList, setMsgList]);

  const handleClickSendButton = useCallback(() => {
    // ↓でバックエンドのハンドラー（通信を待ち受けているポイント）に通信する
    // MessageHandlerクラスのhandleTextMessageメソッドに通信
    if (inputMsg) {
      socket.send(inputMsg);
      console.log("送信！");
    }
  }, [inputMsg]);

  return (
    <div>
      <h1>チャット画面</h1>
      <div css={styles["sendMsg"]}>
        <input value={inputMsg} type="text" onChange={handleChangeMessage} />
        <button type="button" onClick={handleClickSendButton}>
          送信
        </button>
      </div>
      <div css={styles["msgList"]}>
        <ul>
          {msgList.map((msg) => {
            return <ChatList message={msg} />;
          })}
        </ul>
      </div>
    </div>
  );
});

const styles = {
  sendMsg: css``,
  msgList: css`
    ul {
      list-style: none;
    }
  `,
};

export default Chat;
