// ChatContainer.js
import React, { useEffect } from 'react';
import { ChatProvider, useChat } from '@/context/context';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import SidePanel from './SidePanel';
import ollama from "ollama/browser";

function ChatContainerInner() {
  const { state, dispatch } = useChat();

  useEffect(() => {
    const initializeChat = async () => {
      const modelsData = await ollama.list();
      dispatch({ type: 'SET_MODELS', payload: modelsData.models });

      const model = localStorage.getItem("model") || null;
      dispatch({ type: 'SET_CURRENT_MODEL', payload: model });

      const storedPersonas = JSON.parse(localStorage.getItem("personas")) || [];
      dispatch({ type: 'UPDATE_PERSONAS', payload: storedPersonas });

      const personaName = localStorage.getItem("personaName") || null;
      if (personaName) {
        const persona = storedPersonas.find((p) => p.name === personaName);
        dispatch({ type: 'SET_CURRENT_PERSONA', payload: persona || null });
      }
    };

    initializeChat();
  }, [dispatch]);

  return (
    <div className="w-full flex justify-between overflow-hidden">
      <SidePanel />
      <div className="h-full w-full flex justify-center">
        <div className="bg-secondary w-full max-w-3xl flex flex-col justify-between border-x border-borderColor">
          <MessageList />
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

function ChatContainer() {
  return (
    <ChatProvider>
      <ChatContainerInner />
    </ChatProvider>
  );
}

export default ChatContainer;