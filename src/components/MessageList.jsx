// MessageList.js
import React from "react";
import { useChat } from "@/context/context";

function MessageList() {
  const { state } = useChat();
  const currentChat = state.chats[state.currentChatIndex];

  const renderMessage = (message, index, isStreaming = false) => (
    <div key={`message-${index}`} className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-4`}>
      <img className="w-10 h-10 rounded-full object-cover border border-borderColor" src={`${message.role}.jpeg`} alt={`${message.role} avatar`} />
      <p className={`bg-tertiary max-w-3/4 px-5 py-2 flex flex-col rounded-md border border-borderColor ${isStreaming ? "animate-pulse" : ""}`}>
        {message.role === "assistant" && currentChat?.personaName && <span className="uppercase text-accent font-medium text-sm">{currentChat.personaName}</span>}
        <span>
          {message.content}
          {isStreaming && <span className="inline-block animate-pulse pb-2">▋</span>}
        </span>
      </p>
    </div>
  );

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {currentChat ? (
        <>
          {currentChat.messages.map((message, index) => renderMessage(message, index, state.isResponseStreaming && index === currentChat.messages.length - 1 && message.role === "assistant"))}
          {state.isResponseStreaming &&
            currentChat.messages[currentChat.messages.length - 1]?.role !== "assistant" &&
            renderMessage({ role: "assistant", content: "..." }, currentChat.messages.length, true)}
        </>
      ) : (
        <div className="flex flex-col gap-2 my-auto text-center text-gray-500">
          <p>Start a new chat by sending a message.</p>
          <p>Run the following command to point ollama to the chat client:</p>
          <p className="bg-zinc-700 py-2 px-3 text-accent rounded-md">OLLAMA_ORIGINS=https://ollama-next.vercel.app OLLAMA_HOST=127.0.0.1:11434 ollama serve</p>
        </div>
      )}
    </div>
  );
}

export default MessageList;
