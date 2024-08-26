import React from "react";

type Props = {
  message: string;
};

const ChatListContent: React.FC<Props> = React.memo(({ message }) => {
  return <li>{message}</li>;
});

export default ChatListContent;
