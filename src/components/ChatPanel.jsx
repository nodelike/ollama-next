// ChatPanel.js (continued)
import React from "react";
import { useChat } from "@/context/context";

function ChatPanel() {
    const { state } = useChat();

    return (
        <div className={`flex-shrink-0 flex flex-col gap-6 py-4 px-6 transition-all duration-300 ease-in-out `}>
            <h2 className="font-medium text-lg">Chats:</h2>
            <div className="flex flex-col gap-2">
                <div className="bg-tertiary py-2 px-4 rounded-md border border-borderColor cursor-pointer">Chat 1</div>
                
            </div>
        </div>
    );
}

export default ChatPanel;
