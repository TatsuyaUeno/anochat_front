import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SockJS from 'sockjs-client';


// JavaScriptを使用してhtmlタグにスタイルを適用する例
document.documentElement.style.height = "100%";
document.documentElement.style.overflow = "auto";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// websocketのオブジェクトを作成（すぐに「onopen」が呼び出され接続される）
const socket = new SockJS("/ws-connect");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default socket;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
