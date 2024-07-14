// ChatContext.js
import React, { createContext, useContext, useReducer, useMemo } from 'react';

const ChatContext = createContext();

const initialState = {
  messages: [{ role: "assistant", content: "Hello there!" }],
  personas: [],
  models: [],
  currentModel: null,
  currentPersona: null,
  isResponseStreaming: false,
  sidePanel: { type: null, isOpen: false },
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return { ...state, messages: action.payload };
    case 'UPDATE_PERSONAS':
      return { ...state, personas: action.payload };
    case 'SET_MODELS':
      return { ...state, models: action.payload };
    case 'SET_CURRENT_MODEL':
      return { ...state, currentModel: action.payload };
    case 'SET_CURRENT_PERSONA':
      return { ...state, currentPersona: action.payload };
    case 'SET_RESPONSE_STREAMING':
      return { ...state, isResponseStreaming: action.payload };
    case 'SET_SIDE_PANEL':
      return { ...state, sidePanel: action.payload };
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  
  const value = useMemo(() => ({ state, dispatch }), [state]);
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);