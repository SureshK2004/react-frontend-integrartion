import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: number;
  sender: "user" | "admin";
  message: string;
}

const ConversationTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "user", message: "Hi, I need help with my login." },
    { id: 2, sender: "admin", message: "Sure! Can you please share your error message?" },
    { id: 1, sender: "user", message: "Here we Go..." },
    { id: 1, sender: "user", message: "Hi, I need help with my login." },
    { id: 2, sender: "admin", message: "Sure! Can you please share your error message?" },
    { id: 1, sender: "user", message: "Here we Go..." },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "admin", message: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[25%] p-2 rounded-lg ${
              msg.sender === "admin"
                ? "bg-primary text-white self-end ml-auto"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ConversationTab;
