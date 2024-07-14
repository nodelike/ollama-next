// ChatContext.js
import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

const ChatContext = createContext();

const initialState = {
  chats: [],
  currentChatIndex: null,
  personas: [],
  models: [],
  currentModel: null,
  currentPersona: null,
  isResponseStreaming: false,
  sidePanel: { type: null, isOpen: false },
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    case 'ADD_CHAT':
      return { 
        ...state, 
        chats: [...state.chats, action.payload], 
        currentChatIndex: state.chats.length 
      };
    case 'SET_CURRENT_CHAT_INDEX':
      return { ...state, currentChatIndex: action.payload };
    case 'UPDATE_CURRENT_CHAT':
      return {
        ...state,
        chats: state.chats.map((chat, index) =>
          index === state.currentChatIndex ? action.payload : chat
        ),
      };
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
    case 'RESET_CHATS':
      return { ...state, chats: [], currentChatIndex: null };
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    dispatch({ type: 'SET_CHATS', payload: storedChats });
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(state.chats));
  }, [state.chats]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);