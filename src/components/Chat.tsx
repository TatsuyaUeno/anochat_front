import { useState, useEffect } from "react";
import SockJS from 'sockjs-client'



/**
 * WebSocketで双方向通信をするサンプル
 */
function Chat() {
    // 画面に表示する文字列
    const [message, setMessage] = useState<string>("");
    // websocketのオブジェクトを作成（すぐに「onopen」が呼び出され接続される）
    const socket = new SockJS("/ws-connect");

    /**
     * websocketは副作用の処理なので、useEffectを用いる
     */
    useEffect (() => {
        // 接続開始
        socket.onopen = (event) => {
            console.log("websocket connected!");
        };

        // メッセージ受信
        socket.onmessage = (event) => {
            console.log("recive message!")
            setMessage(event.data);
        };

        // 接続終了
        socket.onclose = (event) => {
            console.log("websocket closed!")
        }
    }, []);

    /**
     * メッセージ送信
     */
    const sendMessage = () => {
        const message = "フロントから送信したメッセージ";
        // ↓でバックエンドのハンドラー（通信を待ち受けているポイント）に通信する
        // MessageHandlerクラスのhandleTextMessageメソッドに通信
        socket.send(message);
    }

    return (
        <div>
            <h1>チャット画面</h1>
            <button type="button" onClick={ sendMessage }>送信</button>
            <h3>{ message }</h3>
        </div>
    );
  }
  
  export default Chat;