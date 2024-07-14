// SidePanel.js
import React from 'react';
import { IoMdSettings } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useChat } from '@/context/context';
import SettingsPanel from './SettingsPanel';
import ChatPanel from './ChatPanel';

function SidePanel() {
  const { state, dispatch } = useChat();

  const togglePanel = (panelType) => {
    dispatch({ 
      type: 'SET_SIDE_PANEL', 
      payload: state.sidePanel.type === panelType && state.sidePanel.isOpen
        ? { type: null, isOpen: false }
        : { type: panelType, isOpen: true }
    });
  };

  return (
    <div className="relative flex justify-end h-full bg-secondary border-r border-borderColor transition-all duration-150">
      <div className="flex">

        <div className="flex-shrink-0 flex flex-col gap-4 bg-secondary border-r border-borderColor p-3">
          <div className="bg-tertiary p-3 rounded-md border border-borderColor cursor-pointer">
            <FaPlus className="w-5 h-5" />
          </div>
          <div
            onClick={() => togglePanel('settings')}
            className={`bg-tertiary p-3 rounded-md border border-borderColor cursor-pointer ${state.sidePanel.type === 'settings' ? "text-accent" : ""}`}>
            <IoMdSettings className="w-5 h-5" />
          </div>
          <div
            onClick={() => togglePanel('chat')}
            className={`bg-tertiary p-3 rounded-md border border-borderColor cursor-pointer ${state.sidePanel.type === 'chat' ? "text-accent" : ""}`}>
            <IoChatboxEllipsesSharp className="w-5 h-5" />
          </div>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${state.sidePanel.isOpen ? 'w-96' : 'w-0'}`}>
          {state.sidePanel.type === 'settings' && <SettingsPanel />}
          {state.sidePanel.type === 'chat' && <ChatPanel />}
        </div>
      </div>
    </div>
  );
}

export default SidePanel;