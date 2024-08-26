/** @jsxImportSource @emotion/react */
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatContent from "./components/pages/chat/ChatContent";
import ChatListContent from './components/pages/chat_list/ChatListContent';
import ChatManage from './components/pages/maint/ChatManage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <>
      <Global styles={css`
        ${emotionReset}

        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          html {
            height: 100%;
          }
          body {
            height: 100%;
          }
        }
      `} />
      <BrowserRouter>
        <Routes>
          <Route path="/chat" Component={ChatContent} />
          <Route path='/list' Component={ChatListContent} />
          <Route path='/maint/chatManage' Component={ChatManage} />
          <Route path='/*' Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
