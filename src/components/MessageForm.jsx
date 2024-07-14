// MessageForm.js
import React, { useRef } from 'react';
import { TbSend2 } from "react-icons/tb";
import ollama from "ollama/browser";
import { useChat } from '@/context/context';

function MessageForm() {
  const { state, dispatch } = useChat();
  const messageRef = useRef(null);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = messageRef.current.value.trim();
    if (!message) return;

    messageRef.current.value = "";
    const newUserMessage = { role: "user", content: message };

    dispatch({ type: 'UPDATE_MESSAGES', payload: [...state.messages, newUserMessage] });
    dispatch({ type: 'SET_RESPONSE_STREAMING', payload: true });

    try {
      const response = await ollama.chat({ model: state.currentModel, messages: [...state.messages, newUserMessage], stream: true });

      let fullResponse = "";
      for await (const part of response) {
        fullResponse += part.message.content;
        dispatch({ type: 'UPDATE_MESSAGES', payload: [...state.messages, newUserMessage, { role: "assistant", content: fullResponse }] });
      }
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      dispatch({ type: 'SET_RESPONSE_STREAMING', payload: false });
    }
  };

  return (
    <form className="bg-primary w-full flex gap-4 px-3 py-4 border-t border-borderColor" onSubmit={handleMessageSubmit}>
      <input ref={messageRef} className="w-full bg-transparent focus:outline-none border border-borderColor rounded-md px-5 py-3" type="text" placeholder="Enter message..." />
      <button type="submit" className="border border-borderColor px-4 rounded-md text-accent" disabled={state.isResponseStreaming}>
        <TbSend2 size={24} />
      </button>
    </form>
  );
}

export default MessageForm;