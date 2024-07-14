// MessageList.js
import React from 'react';
import { useChat } from '@/context/context';

function MessageList() {
  const { state } = useChat();
  const { messages, isResponseStreaming, currentResponse } = state;

  const renderMessage = (message, index) => (
    <div key={`message-${index}`} className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-4`}>
      <img className="w-10 h-10 rounded-full object-cover border border-borderColor" src={`${message.role}.png`} alt={`${message.role} avatar`} />
      <p className="bg-tertiary max-w-3/4 px-5 py-4 rounded-md border border-borderColor">{message.content}</p>
    </div>
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      {messages.map(renderMessage)}
      {isResponseStreaming && renderMessage({ role: "assistant", content: currentResponse }, messages.length)}
    </div>
  );
}

export default MessageList;
