// ChatPanel.js
import React from "react";
import { useChat } from "@/context/context";
import { FaTrashCan } from "react-icons/fa6";

function ChatPanel() {
    const { state, dispatch } = useChat();

    const handleSelectChat = (index) => {
        dispatch({ type: "SET_CURRENT_CHAT_INDEX", payload: index });
        const selectedChat = state.chats[index];
        dispatch({ type: "SET_CURRENT_MODEL", payload: selectedChat.modelName });
        const selectedPersona = state.personas.find((p) => p.name === selectedChat.personaName);
        dispatch({ type: "SET_CURRENT_PERSONA", payload: selectedPersona || null });

        localStorage.setItem("model", selectedChat.modelName);
        if (selectedPersona) {
            localStorage.setItem("currentPersona", JSON.stringify(selectedPersona));
        } else {
            localStorage.removeItem("currentPersona");
        }
    };

    const handleResetChats = () => {
        dispatch({ type: "RESET_CHATS" });
    };

    return (
        <div className={`flex-shrink-0 flex flex-col gap-6 py-4 px-6 transition-all duration-300 ease-in-out`}>
            <h2 className="font-medium text-lg">Chats:</h2>
            <div className="flex flex-col gap-2">
                {state.chats.map((chat, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectChat(index)}
                        className={`bg-tertiary py-2 px-4 rounded-md border border-borderColor cursor-pointer ${index === state.currentChatIndex ? "text-accent" : ""}`}>
                        Chat {index + 1}
                    </div>
                ))}
            </div>
            <button onClick={handleResetChats} className="flex gap-4 items-center justify-center border border-borderColor text-red-500 py-2 px-4 rounded-md">
                <FaTrashCan />
                Reset Chats
            </button>
        </div>
    );
}

export default ChatPanel;
