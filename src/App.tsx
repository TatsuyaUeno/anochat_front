import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/chat" Component={Chat} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
