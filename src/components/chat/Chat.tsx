/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import ChatList from "./ChatList";

const Chat = React.memo(() => {
  // チャットリスト
  const [msgList, setMsgList] = useState<string[]>([]);

  // 入力したメッセージ
  const [inputMsg, setInputMsg] = useState<string | undefined>(undefined);

  return (
    <ChatContent
      msgList={msgList}
      setMsgList={setMsgList}
      inputMsg={inputMsg}
      setInputMsg={setInputMsg}
    />
  );
});

type Props = {
  msgList: string[];
  setMsgList: (msgList: string[]) => void;
  inputMsg: string | undefined;
  setInputMsg: (msg: string | undefined) => void;
};

const ChatContent: React.FC<Props> = React.memo(
  ({ msgList, setMsgList, inputMsg, setInputMsg }) => {
    // メッセージ入力・変更時
    const handleChangeMessage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setInputMsg(text);
      },
      [setInputMsg]
    );

    const applyNewMsg = useCallback(
      (newMsg: string) => {
        const newMsgList = [...msgList, newMsg];
        setMsgList(newMsgList);
        console.log(newMsgList, [...msgList, newMsg]);
      },
      [msgList, setMsgList]
    );

    // websocketのオブジェクトを作成（すぐに「onopen」が呼び出され接続される）
    const socket = new SockJS("/ws-connect");

    /**
     * websocketは副作用の処理なので、useEffectを用いる
     */
    useEffect(() => {
      // 接続開始
      socket.onopen = (event) => {
        console.log("websocket connected!");
      };

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
    }, [applyNewMsg, msgList]);

    const sendMessage = useCallback(() => {
      // ↓でバックエンドのハンドラー（通信を待ち受けているポイント）に通信する
      // MessageHandlerクラスのhandleTextMessageメソッドに通信
      if (inputMsg) {
        socket.send(inputMsg);
      }
    }, [inputMsg]);

    return (
      <div>
        <h1>チャット画面</h1>
        <div css={styles["sendMsg"]}>
          <input value={inputMsg} type="text" onChange={handleChangeMessage} />
          <button type="button" onClick={sendMessage}>
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
  }
);

const styles = {
  sendMsg: css``,
  msgList: css`
    ul {
      list-style: none;
    }
  `,
};

export default Chat;
