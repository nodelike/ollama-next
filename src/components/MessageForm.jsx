import React, { useRef, useState } from "react";
import { TbSend2, TbSquareRoundedX } from "react-icons/tb";
import ollama from "ollama/browser";
import { useChat } from "@/context/context";
import toast from "react-hot-toast";

function MessageForm() {
  const { state, dispatch } = useChat();
  const messageRef = useRef(null);
  const [abortController, setAbortController] = useState(null);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = messageRef.current.value.trim();
    if (!message) return;
    messageRef.current.value = "";

    const newUserMessage = { role: "user", content: message };
    let currentChat;

    if (state.currentChatIndex === null || state.chats.length === 0) {
      // Create a new chat
      currentChat = {
        modelName: state.currentModel,
        personaName: state.currentPersona?.name || "",
        messages: [newUserMessage],
      };
      dispatch({ type: "ADD_CHAT", payload: currentChat });
    } else {
      // Update existing chat
      currentChat = { ...state.chats[state.currentChatIndex] };
      currentChat.messages = [...currentChat.messages, newUserMessage];
      dispatch({
        type: "UPDATE_CURRENT_CHAT",
        payload: currentChat,
      });
    }

    dispatch({ type: "SET_RESPONSE_STREAMING", payload: true });
    const currentPersona = state.personas.find((p) => p.name === currentChat.personaName);
    let persona = { role: "system", content: currentPersona?.description || "You are an AI assistant named Dolphin." };

    try {
      const controller = new AbortController();
      setAbortController(controller);

      const response = await ollama.chat({
        model: currentChat.modelName,
        messages: [persona, ...currentChat.messages],
        stream: true,
        signal: controller.signal,
      });

      let fullResponse = "";
      let isFirstChunk = true;

      for await (const part of response) {
        fullResponse += part.message.content;
        if (isFirstChunk) {
          currentChat.messages = [...currentChat.messages, { role: "assistant", content: fullResponse }];
          isFirstChunk = false;
        } else {
          currentChat.messages[currentChat.messages.length - 1].content = fullResponse;
        }
        dispatch({
          type: "UPDATE_CURRENT_CHAT",
          payload: currentChat,
        });
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.success("Message generation stopped");
      } else {
        toast.error("Error in chat:", error);
      }
    } finally {
      dispatch({ type: "SET_RESPONSE_STREAMING", payload: false });
      setAbortController(null);
    }
  };

  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      dispatch({ type: "SET_RESPONSE_STREAMING", payload: false });
    }
  };

  return (
    <form className="bg-primary w-full flex gap-4 px-3 py-4 pb-10 rounded-md border-x border-t border-borderColor" onSubmit={handleMessageSubmit}>
      <input ref={messageRef} className="w-full bg-transparent focus:outline-none border border-borderColor rounded-md px-5 py-3" type="text" placeholder="Enter message..." />
      {state.isResponseStreaming ? (
        <button type="button" className="border border-borderColor px-4 rounded-md text-accent" onClick={handleStopGeneration}>
          <TbSquareRoundedX size={24} />
        </button>
      ) : (
        <button type="submit" className="border border-borderColor px-4 rounded-md text-accent" disabled={state.isResponseStreaming}>
          <TbSend2 size={24} />
        </button>
      )}
    </form>
  );
}

export default MessageForm;
