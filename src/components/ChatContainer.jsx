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
      
      const storedPersonas = JSON.parse(localStorage.getItem("personas")) || [];
      dispatch({ type: 'UPDATE_PERSONAS', payload: storedPersonas });
      
      if (state.currentChatIndex !== null) {
        const currentChat = state.chats[state.currentChatIndex];
        dispatch({ type: 'SET_CURRENT_MODEL', payload: currentChat.modelName });
        const currentPersona = storedPersonas.find(p => p.name === currentChat.personaName);
        dispatch({ type: 'SET_CURRENT_PERSONA', payload: currentPersona || null });
      } else {
        const model = localStorage.getItem("model") || null;
        dispatch({ type: 'SET_CURRENT_MODEL', payload: model });
        const persona = JSON.parse(localStorage.getItem("currentPersona")) || null;
        if (persona) {
          dispatch({ type: 'SET_CURRENT_PERSONA', payload: persona });
        }
      }
    };

    initializeChat();
  }, [dispatch, state.currentChatIndex]);

  return (
    <div className="w-full flex justify-between overflow-hidden">
      <SidePanel />
      <div className="h-full w-full flex justify-center">
        <div className="w-full max-w-3xl flex flex-col justify-between mx-8">
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