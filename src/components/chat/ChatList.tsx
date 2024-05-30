import React from "react";

type Props = {
  message: string;
};

const ChatList: React.FC<Props> = React.memo(({ message }) => {
  return <li>{message}</li>;
});

export default ChatList;
